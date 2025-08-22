'use server';

import { revalidatePath } from 'next/cache';
import { firestore } from '@/lib/firebase';
import type { Product, WithId } from '@/lib/types';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['Produto', 'Serviço']),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  value: z.coerce.number().min(0.01, 'Valor deve ser positivo'),
  photoUrl: z.string().optional(),
});

type ProductInput = z.infer<typeof ProductSchema>;

export async function getProducts(): Promise<WithId<Product>[]> {
  const snapshot = await firestore.collection('products').orderBy('name').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WithId<Product>));
}

export async function getProductById(id: string): Promise<WithId<Product>> {
    const doc = await firestore.collection('products').doc(id).get();
    if (!doc.exists) {
        throw new Error(`Product with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as WithId<Product>;
}

export async function createProduct(data: ProductInput) {
  const validation = ProductSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map(e => e.message).join(', '));
  }

  await firestore.collection('products').add({
    ...data,
    createdAt: new Date().toISOString(),
  });
  revalidatePath('/products');
}

export async function updateProduct(id: string, data: ProductInput) {
    const validation = ProductSchema.safeParse(data);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    await firestore.collection('products').doc(id).update(data);
    revalidatePath('/products');
}

export async function deleteProduct(id: string) {
    await firestore.collection('products').doc(id).delete();
    revalidatePath('/products');
}
