'use server';

import { revalidatePath } from 'next/cache';
import { firestore } from '@/lib/firebase';
import type { CompanyInfo } from '@/lib/types';
import { z } from 'zod';

const CompanyInfoSchema = z.object({
  name: z.string().optional(),
  logoUrl: z.string().optional(),
});

type CompanyInfoInput = z.infer<typeof CompanyInfoSchema>;

const DOC_ID = 'main';
const COLLECTION_NAME = 'companyInfo';

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
    try {
        const doc = await firestore.collection(COLLECTION_NAME).doc(DOC_ID).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data() as CompanyInfo;
    } catch (error) {
        console.error("Error fetching company info:", error);
        return null;
    }
}

export async function updateCompanyInfo(data: CompanyInfoInput) {
  const validation = CompanyInfoSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.errors.map(e => e.message).join(', '));
  }

  await firestore.collection(COLLECTION_NAME).doc(DOC_ID).set(data, { merge: true });

  revalidatePath('/settings');
  revalidatePath('/');
}
