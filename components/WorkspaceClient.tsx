"use client";

import { Code } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { CodePanel } from './ui/CodePanel';
import { FileData, Message, StatusStep, WorkspaceData } from '@/types/workspace';
import ChatPanel from './ui/ChatPanel';


interface WorkspaceClientProps {
  initialPrompt: string | null;
  workspace: WorkspaceData | null;
  userCredits: number;
  userId: string;
  userPlan: string;
}


export function WorkspaceClient  ({  initialPrompt,
  workspace,
  userCredits,
  userId,
  userPlan,
}: WorkspaceClientProps) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [credits, setCredits] = useState(userCredits);
const [fileData, setFileData] = useState<FileData | null>(
null
)
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusLog, setStatusLog] = useState<StatusStep[]>([]);
  const [isImproving, setIsImproving] = useState(false);

   const handleFilePatch = useCallback((patches: FileData) => {
    setFileData(patches);
  }, []);

  const handleGenerate = useCallback(
        async (prompt: string, imageUrl?: string) => {
        },[credits,isGenerating,userId,workspaceId]

  )
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0a0a0a]">
      <ChatPanel
          isImproving={isImproving}
          messages={messages}
          isGenerating={isGenerating}
          statusLog={statusLog}
          credits={credits}
          initialPrompt={initialPrompt}
          onGenerate={handleGenerate}
          userId={userId}
          workspaceId={workspaceId}
          appTitle={"My App"}
        />
    

      {/* Code panel - right */}
  <CodePanel 
  fileData={fileData}
  isGenerating={isGenerating}
  statusLog={statusLog}
  onFilePatch={handleFilePatch}
   />
    </div>
  );
};



export default WorkspaceClient
