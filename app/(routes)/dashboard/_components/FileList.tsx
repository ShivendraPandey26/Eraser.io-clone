"use client";

import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: Id<"files">;
  _creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext); 
  const [fileList, setFileList] = useState<FILE[]>([]);

  // Get Kinde user data (auth info)
  const { user }: any = useKindeBrowserClient();

  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  const deleteFile = useMutation(api.files.deleteFile);
  const handleDelete = async (fileId: Id<"files">) => {
    try {
      await deleteFile({ _id: fileId });

      // Filter out the deleted file from fileList_
      const updatedList = fileList.filter((file) => file._id !== fileId);
      setFileList(updatedList);
      setFileList_(updatedList); // Update context as well
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileList.map((file, index) => (
              <tr
                key={index}
                className="odd:bg-gray-50 cursor-pointer"
                onClick={() => router.push("/workspace/" + file._id)}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user && (
                    <Image
                      src={user?.picture}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                </td>
                <td
                  className="whitespace-nowrap px-4 py-2 text-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="gap-3 text-red-600"
                        onClick={() => handleDelete(file._id)}
                      >
                        <Archive className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
