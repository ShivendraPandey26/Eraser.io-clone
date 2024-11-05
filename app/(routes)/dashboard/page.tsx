"use client"
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

function Dashboard() {
  return (
    <main>
      <div>Dashboard</div>
      <Button>
        <LogoutLink> Logout </LogoutLink>
      </Button>
    </main>
  );
}

export default Dashboard;
