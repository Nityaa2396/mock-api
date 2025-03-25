"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({ users: false, products: false });
  const [error, setError] = useState({ users: null, products: null });

  const fetchUsers = async () => {
    setLoading((prev) => ({ ...prev, users: true }));
    setError((prev) => ({ ...prev, users: null }));

    try {
      const response = await fetch("/api/mock/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        setError((prev) => ({ ...prev, users: "Failed to fetch users" }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, users: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  };

  const fetchProducts = async () => {
    setLoading((prev) => ({ ...prev, products: true }));
    setError((prev) => ({ ...prev, products: null }));

    try {
      const response = await fetch("/api/mock/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError((prev) => ({ ...prev, products: "Failed to fetch products" }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, products: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mock API Demo</h1>

      <Tabs defaultValue="users" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users API</TabsTrigger>
          <TabsTrigger value="products">Products API</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Users API</CardTitle>
              <CardDescription>
                Fetch mock user data from the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={fetchUsers} disabled={loading.users}>
                  {loading.users ? "Loading..." : "Fetch All Users"}
                </Button>

                {error.users && (
                  <div className="text-red-500 mt-2">{error.users}</div>
                )}

                {users.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Results:</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                      {JSON.stringify(users, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-2">
                Available endpoints:
              </p>
              <code className="bg-muted p-2 rounded text-sm mb-1 block w-full">
                /api/mock/users
              </code>
              <code className="bg-muted p-2 rounded text-sm block w-full">
                /api/mock/users/[id]
              </code>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Products API</CardTitle>
              <CardDescription>
                Fetch mock product data from the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={fetchProducts} disabled={loading.products}>
                  {loading.products ? "Loading..." : "Fetch All Products"}
                </Button>

                {error.products && (
                  <div className="text-red-500 mt-2">{error.products}</div>
                )}

                {products.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Results:</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                      {JSON.stringify(products, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-2">
                Available endpoints:
              </p>
              <code className="bg-muted p-2 rounded text-sm mb-1 block w-full">
                /api/mock/products
              </code>
              <code className="bg-muted p-2 rounded text-sm mb-1 block w-full">
                /api/mock/products?category=Electronics
              </code>
              <code className="bg-muted p-2 rounded text-sm block w-full">
                /api/mock/products/[id]
              </code>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
