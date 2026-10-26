import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import type { Project } from '../types/portfolio';
import { ProjectFormModal } from './ProjectFormModal';
import {
  Lock,
  Unlock,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

interface AdminEditorProps {
  onBackToPublic: () => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({ onBackToPublic }) => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    resetToDefaults,
    exportProjectsJson,
    importProjectsJson
  } = useProjects();

  // Authentication State
  const configuredPassphrase = import.meta.env.VITE_ADMIN_PASSPHRASE || 'ruturaj-design';
  const [passphraseInput, setPassphraseInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  // Editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphraseInput.trim() === configuredPassphrase) {
      setIsUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passphrase. Please check your credentials.');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    reorderProjects(newProjects);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportProjectsJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ruturaj-projects-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importProjectsJson(content);
        if (success) {
          setImportStatus('Projects imported successfully!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Failed to parse JSON file.');
          setTimeout(() => setImportStatus(null), 3000);
        }
      };
    }
  };

  // Locked View
  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#09090b] text-zinc-200">
        <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Private Portfolio Editor
            </h2>
            <p className="text-xs text-zinc-400">
              Private client-side editing layer for managing project data locally.
            </p>
          </div>

          {/* Explicit client-side notice */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-300 block">Note on Security:</span>
            <p>
              This is a private, client-side editor intended for Ruturaj&apos;s workflow. Project data is saved to local storage. It does not claim to provide server-backed authentication.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Enter Passphrase
              </label>
              <input
                type="password"
                required
                placeholder="Enter editor passphrase"
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Unlock Editor
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-900">
            <button
              onClick={onBackToPublic}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Management Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              <Unlock className="w-3.5 h-3.5" />
              <span>Private Client-Side Editor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Portfolio Project Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onBackToPublic}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>

            <button
              onClick={() => setIsUnlocked(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              Lock
            </button>

            <button
              onClick={() => {
                setEditingProject(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Data Tools Bar */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export JSON</span>
            </button>

            <label className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {importStatus && (
              <span className="text-xs text-amber-400 font-mono animate-pulse">
                {importStatus}
              </span>
            )}
          </div>

          <div>
            <button
              onClick={() => setConfirmReset(true)}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase px-4">
            <span>Project ({projects.length})</span>
            <span>Controls</span>
          </div>

          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-mono text-xs text-zinc-500 font-bold">
                    {idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-white">{proj.title}</h4>
                      {proj.featured && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Featured
                        </span>
                      )}
                      {proj.futureConcept && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                          Concept
                        </span>
                      )}
                      {proj.aiAssistance.enabled && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                          AI-Assisted
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {proj.category} · {proj.role} · {proj.engine}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  {/* Reorder */}
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setIsFormOpen(true);
                    }}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 hover:bg-zinc-800"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setConfirmDeleteId(proj.id)}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-rose-400 hover:bg-zinc-800"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-sm w-full space-y-4 text-center">
              <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Delete Project?</h4>
              <p className="text-xs text-zinc-400">
                Are you sure you want to remove this project? This will update local storage immediately.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-700 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProject(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs bg-rose-600 text-white font-medium hover:bg-rose-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {confirmReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-sm w-full space-y-4 text-center">
              <RotateCcw className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Reset to Default Data?</h4>
              <p className="text-xs text-zinc-400">
                This will restore the original verified portfolio projects (Andhaar, Judgement, Konre, Dungeon Escape, and ReLiveCricket) and remove custom edits.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-700 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetToDefaults();
                    setConfirmReset(false);
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Form Modal */}
        <ProjectFormModal
          isOpen={isFormOpen}
          project={editingProject}
          onClose={() => setIsFormOpen(false)}
          onSave={(savedProject) => {
            if (editingProject) {
              updateProject(savedProject.id, savedProject);
            } else {
              addProject(savedProject);
            }
          }}
        />
      </div>
    </div>
  );
};
