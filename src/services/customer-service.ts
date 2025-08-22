'use server';

import { revalidatePath } from 'next/cache';
import { firestore } from '@/lib/firebase';
import type { Customer, WithId } from '@/lib/types';
import { z } from 'zod';

const CustomerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  document: z.string().min(1, 'CPF/CNPJ é obrigatório'),
});

type CustomerInput = z.infer<typeof CustomerSchema>;

export async function getCustomers(): Promise<WithId<Customer>[]> {
  const snapshot = await firestore.collection('customers').orderBy('name').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WithId<Customer>));
}

export async function getCustomerById(id: string): Promise<WithId<Customer>> {
    const doc = await firestore.collection('customers').doc(id).get();
    if (!doc.exists) {
        throw new Error(`Customer with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as WithId<Customer>;
}

export async function createCustomer(data: CustomerInput) {
  const validation = CustomerSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map(e => e.message).join(', '));
  }

  const newCustomer = {
      ...data,
      createdAt: new Date().toISOString(),
  }

  await firestore.collection('customers').add(newCustomer);
  revalidatePath('/customers');
}

export async function updateCustomer(id: string, data: CustomerInput) {
    const validation = CustomerSchema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    await firestore.collection('customers').doc(id).update(data);
    revalidatePath('/customers');
}

export async function deleteCustomer(id: string) {
    await firestore.collection('customers').doc(id).delete();
    revalidatePath('/customers');
}
