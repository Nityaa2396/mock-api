import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mock API Demo</h1>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Table</CardTitle>
            <CardDescription>View user data in a table format</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This page displays user data from the mock API in a table format.
              You can view all users or search for a specific user by ID.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/users" className="w-full">
              <Button className="w-full">View User Table</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Explorer</CardTitle>
            <CardDescription>
              Explore all available API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This page allows you to explore and test all available API
              endpoints including users and products.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/api-explorer" className="w-full">
              <Button className="w-full" variant="outline">
                API Explorer
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
