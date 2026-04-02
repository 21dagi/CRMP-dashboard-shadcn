"use client";

import { CheckSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEvaluationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-2">
        <CheckSquare className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Review, score, and decide on evaluator feedback (placeholder UI for now).
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">No evaluation data wired yet</CardTitle>
        </CardHeader>
        <CardContent>
          Connect the backend evaluation endpoints and replace this placeholder with the real table/cards.
        </CardContent>
      </Card>
    </div>
  );
}