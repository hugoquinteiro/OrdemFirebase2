
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProductForm } from "./_components/product-form";
import { ProductList } from "./_components/product-list";
import { getProducts } from "@/services/product-service";


export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Produtos e Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e serviços.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Novo Item</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo item.
              </DialogDescription>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

     <ProductList products={products} />

    </div>
  );
}
