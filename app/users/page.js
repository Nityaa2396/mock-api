"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(idParam || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  // Function to fetch all users
  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const response = await fetch("/api/mock/users");
      const data = await response.json();

      setDebugInfo({
        endpoint: "/api/mock/users",
        responseStatus: response.status,
        responseData: data,
      });

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      if (data.success && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
        setError("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching all users:", err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single user
  const fetchSingleUser = async (id) => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const endpoint = `/api/mock/users/${id}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      setDebugInfo({
        endpoint,
        responseStatus: response.status,
        responseData: data,
      });

      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch user with ID ${id}`);
      }

      if (data.success && data.data) {
        // Ensure we're setting an array with the single user
        setUsers([data.data]);
      } else {
        setUsers([]);
        setError(`User with ID ${id} not found`);
      }
    } catch (err) {
      console.error(`Error fetching user with ID ${id}:`, err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle ID input change
  const handleIdChange = (e) => {
    const value = e.target.value.trim();
    setUserId(value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (userId) {
      router.push(`/users?id=${userId}`);
      fetchSingleUser(userId);
    } else {
      router.push("/users");
      fetchAllUsers();
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setUserId("");
    router.push("/users");
    fetchAllUsers();
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (idParam) {
      setUserId(idParam);
      fetchSingleUser(idParam);
    } else {
      fetchAllUsers();
    }
  }, [idParam]);

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Data</CardTitle>
          <CardDescription>
            View all users or search for a specific user by ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 mb-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="userId">User ID</label>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={handleIdChange}
                placeholder="Enter user ID or leave empty for all users"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-center">
                <p>Loading user data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <Table>
              <TableCaption>
                {userId
                  ? users.length > 0
                    ? `Showing user with ID: ${userId}`
                    : `No user found with ID: ${userId}`
                  : "List of all users"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-800"
                              : user.role === "manager"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Debug information - remove in production */}
          {debugInfo && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md overflow-auto">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <p>
                <strong>Endpoint:</strong> {debugInfo.endpoint}
              </p>
              <p>
                <strong>Response Status:</strong> {debugInfo.responseStatus}
              </p>
              <p>
                <strong>Response Data:</strong>
              </p>
              <pre className="bg-gray-200 p-2 rounded mt-2 text-xs">
                {JSON.stringify(debugInfo.responseData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Data fetched from:{" "}
          {userId ? `/api/mock/users/${userId}` : "/api/mock/users"}
        </CardFooter>
      </Card>
    </div>
  );
}
