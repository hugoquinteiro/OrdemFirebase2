'use server';

import { revalidatePath } from 'next/cache';
import { firestore } from '@/lib/firebase';
import type { Budget, WithId, HydratedBudget } from '@/lib/types';
import { z } from 'zod';
import { getCustomerById } from './customer-service';
import { getProductById } from './product-service';

const BudgetItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.coerce.number().min(1, 'Quantidade deve ser maior que zero'),
  unitValue: z.coerce.number().min(0.01, 'Valor unitário deve ser positivo'),
});

const BudgetSchema = z.object({
  customerId: z.string().min(1, 'Cliente é obrigatório'),
  customerName: z.string(),
  items: z.array(BudgetItemSchema).min(1, 'Orçamento deve ter pelo menos um item'),
  total: z.coerce.number(),
  status: z.enum(['Aberto', 'Aceito', 'Finalizado', 'Recusado']),
  expiresAt: z.string().min(1, 'Data de validade é obrigatória'),
});

export type BudgetInput = z.infer<typeof BudgetSchema>;

async function hydrateBudget(budget: WithId<Budget>): Promise<HydratedBudget> {
    const customer = await getCustomerById(budget.customerId);
    const items = await Promise.all(
        budget.items.map(async (item) => {
            const product = await getProductById(item.productId);
            return {
                product,
                quantity: item.quantity,
                unitValue: item.unitValue,
            };
        })
    );

    return {
        ...budget,
        customer,
        items,
    };
}


export async function getBudgets(): Promise<HydratedBudget[]> {
  const snapshot = await firestore.collection('budgets').orderBy('createdAt', 'desc').get();
  const budgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WithId<Budget>));
  return Promise.all(budgets.map(hydrateBudget));
}

export async function getBudgetById(id: string): Promise<HydratedBudget | null> {
    const doc = await firestore.collection('budgets').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    return hydrateBudget({ id: doc.id, ...doc.data() } as WithId<Budget>);
}


export async function createBudget(data: BudgetInput) {
  const validation = BudgetSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map(e => e.message).join(', '));
  }

  const newBudget = {
    ...data,
    createdAt: new Date().toISOString(),
  }

  await firestore.collection('budgets').add(newBudget);

  revalidatePath('/budgets');
  revalidatePath('/');
}

export async function updateBudget(id: string, data: BudgetInput) {
    const validation = BudgetSchema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    await firestore.collection('budgets').doc(id).update(data);
    revalidatePath('/budgets');
    revalidatePath(`/budgets/${id}`);
    revalidatePath('/');
}

export async function deleteBudget(id: string) {
    await firestore.collection('budgets').doc(id).delete();
    revalidatePath('/budgets');
    revalidatePath('/');
}