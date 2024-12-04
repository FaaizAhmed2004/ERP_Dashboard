

"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/Components/ui/button"; // Import ShadCN Button component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"; // Import ShadCN Table components
import { RxReload } from "react-icons/rx";

interface Employee {
  _id: number;
  name: string;
  email: string;
  phoneno: string;
  address: string;
  cnic_no: string;
  password?: string; // Optional since we might not need to display it
  profilePic?: string; // Optional since not all employees may have this
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

export default function Employees() {
  const { data, error, isLoading } = useSWR("https://erp-woad-pi.vercel.app/v1/employe/getallemployee", fetcher);

  const employees: Employee[] = data?.employees || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Show loading state */}
      {isLoading && <p><RxReload/></p>}

      {/* Show error message */}
      {error && <p className="text-red-500">{error.message || "Something went wrong"}</p>}

      {/* Employee Table */}
      {!isLoading && !error && employees.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phoneno}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.cnic_no}</TableCell>
                  <TableCell>
                    <Link href={`/employees/${employee._id}`} passHref>
                      <Button variant="secondary">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Show no data message */}
      {!isLoading && !error && employees.length === 0 && <p>No employees found.</p>}
    </div>
  );
}