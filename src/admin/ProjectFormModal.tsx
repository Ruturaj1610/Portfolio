import React, { useState, useEffect, useRef } from 'react';
import type { Project, ProjectMediaItem } from '../types/portfolio';
import {
  X,
  Save,
  Upload,
  Film,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  HelpCircle,
  Star,
  Eye,
  Video
} from 'lucide-react';
import {
  saveMediaFile,
  deleteMediaFile,
  formatBytes,
  parseExternalMediaUrl,
  getMediaUrl
} from '../utils/mediaStorage';

interface ProjectFormModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  const isEditing = !!project;

  const [formData, setFormData] = useState<Project>(() => {
    if (project) return { ...project };
    return {
      id: `project-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Game Design',
      role: 'Game Designer',
      engine: 'Unreal Engine 5',
      technology: ['Unreal Engine 5'],
      designFocus: ['Gameplay Mechanics', 'Player Experience'],
      overview: '',
      idea: '',
      coreGameplay: [''],
      designDecisions: [''],
      playerExperience: '',
      development: '',
      media: {
        screenshots: [],
        placeholderLabel: 'Gameplay footage coming soon',
        gallery: []
      },
      links: {
        githubUrl: '',
        liveUrl: ''
      },
      tags: ['Game Design'],
      featured: true,
      futureConcept: false,
      aiAssistance: {
        enabled: false,
        label: 'AI-assisted prototype',
        disclosure: ''
      },
      status: 'Active Prototype',
      order: 99
    };
  });

  // Media gallery state
  const [gallery, setGallery] = useState<ProjectMediaItem[]>(() => {
    if (project?.media?.gallery && project.media.gallery.length > 0) {
      return [...project.media.gallery];
    }
    if (project?.media?.screenshots && project.media.screenshots.length > 0) {
      return project.media.screenshots.map((url, idx) => ({
        id: `legacy-${idx}-${Date.now()}`,
        type: 'image',
        url,
        name: `Screenshot ${idx + 1}`,
        source: 'external'
      }));
    }
    return [];
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [externalCaptionInput, setExternalCaptionInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showStorageGuide, setShowStorageGuide] = useState(false);
  const [previewMediaItem, setPreviewMediaItem] = useState<ProjectMediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stringified helpers for array fields
  const [techInput, setTechInput] = useState(() => formData.technology.join(', '));
  const [focusInput, setFocusInput] = useState(() => formData.designFocus.join(', '));
  const [gameplayInput, setGameplayInput] = useState(() => formData.coreGameplay.join('\n'));
  const [decisionsInput, setDecisionsInput] = useState(() => formData.designDecisions.join('\n'));
  const [tagsInput, setTagsInput] = useState(() => formData.tags.join(', '));

  // Resolve IndexedDB URLs on load if needed (intentionally runs once on mount only)
  useEffect(() => {
    let active = true;

    async function hydrateUrls() {
      if (!gallery || gallery.length === 0) return;
      const updated = await Promise.all(
        gallery.map(async (item) => {
          if (item.source === 'indexeddb' && (!item.url || item.url.startsWith('blob:'))) {
            try {
              const freshUrl = await getMediaUrl(item.id);
              if (freshUrl) {
                return { ...item, url: freshUrl };
              }
            } catch {
              // keep existing
            }
          }
          return item;
        })
      );

      if (active) {
        setGallery(updated);
      }
    }

    hydrateUrls();

    return () => {
      active = false;
    };
  // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;

  const handleFileUpload = async (files: FileList | File[]) => {
    setIsUploading(true);
    setUploadError(null);
    const newItems: ProjectMediaItem[] = [];

    for (const file of Array.from(files)) {
      const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(file.name);
      const isVideo = file.type.startsWith('video/') || /\.(mp4|webm)$/i.test(file.name);

      if (!isImage && !isVideo) {
        setUploadError(`Skipped "${file.name}": Unsupported format. Allowed: PNG, JPG, JPEG, WebP, MP4, WebM.`);
        continue;
      }

      try {
        const mediaId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const savedItem = await saveMediaFile(mediaId, formData.id, file);
        newItems.push(savedItem);
      } catch (err) {
        console.error('Failed to save file:', err);
        setUploadError(`Could not save "${file.name}".`);
      }
    }

    if (newItems.length > 0) {
      setGallery((prev) => [...prev, ...newItems]);
    }
    setIsUploading(false);
  };

  const handleAddExternalMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrlInput.trim()) return;

    try {
      const item = parseExternalMediaUrl(externalUrlInput.trim(), externalCaptionInput.trim());
      setGallery((prev) => [...prev, item]);
      setExternalUrlInput('');
      setExternalCaptionInput('');
      setUploadError(null);
    } catch {
      setUploadError('Invalid media URL provided.');
    }
  };

  const moveMediaItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;
    const updated = [...gallery];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setGallery(updated);
  };

  const removeMediaItem = async (index: number) => {
    const item = gallery[index];
    if (item.source === 'indexeddb') {
      try {
        await deleteMediaFile(item.id);
      } catch (e) {
        console.warn('Failed to delete media from IndexedDB:', e);
      }
    }
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCoverMedia = (id: string) => {
    setGallery((prev) =>
      prev.map((item) => ({
        ...item,
        isCover: item.id === id ? !item.isCover : false
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const coverItem = gallery.find((m) => m.isCover) || gallery.find((m) => m.type === 'image') || gallery[0];

    const updated: Project = {
      ...formData,
      id: formData.id || `proj-${Date.now()}`,
      technology: techInput.split(',').map((s) => s.trim()).filter(Boolean),
      designFocus: focusInput.split(',').map((s) => s.trim()).filter(Boolean),
      coreGameplay: gameplayInput.split('\n').map((s) => s.trim()).filter(Boolean),
      designDecisions: decisionsInput.split('\n').map((s) => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map((s) => s.trim()).filter(Boolean),
      media: {
        ...formData.media,
        gallery,
        coverImage: coverItem ? coverItem.url : formData.media.coverImage,
        screenshots: gallery.filter((m) => m.type === 'image').map((m) => m.url)
      }
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#101118] border border-zinc-700/80 rounded-2xl shadow-2xl text-zinc-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101118]/95 backdrop-blur-md border-b border-zinc-800">
          <h3 className="text-lg font-bold font-display text-white">
            {isEditing ? `Edit: ${formData.title}` : 'Add New Project'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              General Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Subtitle / One-line Description *</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Engine / Platform</label>
                <input
                  type="text"
                  value={formData.engine}
                  onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Display Status Badge</label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Checkboxes & Flags */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Featured Project (Top Showcase)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.futureConcept}
                  onChange={(e) => setFormData({ ...formData, futureConcept: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Future Concept Section</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.aiAssistance.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aiAssistance: { ...formData.aiAssistance, enabled: e.target.checked }
                    })
                  }
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                <span>AI-Assisted Project Badge</span>
              </label>
            </div>

            {/* AI Disclosure note if enabled */}
            {formData.aiAssistance.enabled && (
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <label className="block text-xs text-zinc-400">
                  AI Assistance Disclosure / Role Explanation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ruturaj designed gameplay & rules; code generated with AI assistance."
                  value={formData.aiAssistance.disclosure || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aiAssistance: { ...formData.aiAssistance, disclosure: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Design Focus & Technology */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Design Focus & Tags
            </h4>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Primary Game Design Focus (comma-separated, e.g. Tension, Pacing, Environmental Storytelling)
              </label>
              <input
                type="text"
                value={focusInput}
                onChange={(e) => setFocusInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Technologies Used (comma-separated, e.g. Unreal Engine 5, Blueprints, C++)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Tags / Badges (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Case Study Detailed Content */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Case Study Sections (01 to 06)
            </h4>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">01 — Overview</label>
              <textarea
                rows={3}
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">02 — The Idea</label>
              <textarea
                rows={3}
                value={formData.idea}
                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                03 — Core Gameplay (one mechanic / verb per line)
              </label>
              <textarea
                rows={4}
                value={gameplayInput}
                onChange={(e) => setGameplayInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                04 — Design Decisions (one key decision per line)
              </label>
              <textarea
                rows={4}
                value={decisionsInput}
                onChange={(e) => setDecisionsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">05 — Player Experience</label>
              <textarea
                rows={3}
                value={formData.playerExperience}
                onChange={(e) => setFormData({ ...formData, playerExperience: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                06 — Development & Implementation Notes
              </label>
              <textarea
                rows={3}
                value={formData.development}
                onChange={(e) => setFormData({ ...formData, development: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Links & Media Section */}
          <div className="space-y-4 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Media & External Links
              </h4>
              <button
                type="button"
                onClick={() => setShowStorageGuide(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Storage & Cloud Guide</span>
              </button>
            </div>

            {/* Existing External Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Live Game URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.links.liveUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, liveUrl: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.links.githubUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, githubUrl: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1">
                  Media Placeholder Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gameplay footage coming soon"
                  value={formData.media.placeholderLabel || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      media: { ...formData.media, placeholderLabel: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                DEDICATED PROJECT MEDIA UPLOADER & GALLERY
                ═══════════════════════════════════════════════════ */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-semibold text-white font-display flex items-center gap-2">
                    <Film className="w-4 h-4 text-amber-400" />
                    <span>Project Media Gallery</span>
                  </h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Upload images (PNG, JPG, WebP) and gameplay videos (MP4, WebM) or paste external video links.
                  </p>
                </div>
                <span className="text-xs font-mono bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 text-zinc-300">
                  {gallery.length} {gallery.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Upload Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleFileUpload(e.dataTransfer.files);
                  }
                }}
                className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all ${
                  isDragging
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files);
                    }
                  }}
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center text-amber-400 mb-1">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-200">
                    Drag & drop media files here, or{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                    >
                      browse files
                    </button>
                  </p>
                  <p className="text-xs text-zinc-400 font-mono">
                    Supported: PNG, JPG, JPEG, WebP, MP4, WebM
                  </p>

                  {isUploading && (
                    <div className="mt-2 text-xs font-mono text-amber-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>Processing media files...</span>
                    </div>
                  )}

                  {uploadError && (
                    <div className="mt-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 px-3 py-1.5 rounded-lg">
                      {uploadError}
                    </div>
                  )}
                </div>
              </div>

              {/* Add External Video / Image URL */}
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                  Or Add Media via External URL (YouTube, Vimeo, MP4, WebM, Cloud CDN)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or direct video/image URL"
                    value={externalUrlInput}
                    onChange={(e) => setExternalUrlInput(e.target.value)}
                    className="sm:col-span-7 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Label / Caption (optional)"
                    value={externalCaptionInput}
                    onChange={(e) => setExternalCaptionInput(e.target.value)}
                    className="sm:col-span-3 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddExternalMedia}
                    className="sm:col-span-2 px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 hover:border-amber-500/50 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add URL</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Media Gallery List */}
              {gallery.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Project Media List (Drag or use arrows to reorder)
                  </span>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {gallery.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 hover:border-zinc-700 transition-colors group"
                      >
                        {/* Thumbnail / Preview container */}
                        <div
                          onClick={() => setPreviewMediaItem(item)}
                          className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-800 cursor-pointer flex items-center justify-center group-hover:ring-1 group-hover:ring-amber-500"
                          title="Click to preview"
                        >
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-amber-400">
                              <Video className="w-4 h-4" />
                              <span className="text-[9px] font-mono mt-0.5">VIDEO</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Title, type & size metadata */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white truncate">
                              {item.name}
                            </span>
                            {item.isCover && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                COVER
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-0.5">
                            <span className="uppercase text-amber-400/90 font-semibold">
                              {item.externalProvider
                                ? `${item.externalProvider.toUpperCase()}`
                                : item.type.toUpperCase()}
                            </span>
                            <span>•</span>
                            <span>
                              {item.size ? formatBytes(item.size) : 'External Stream'}
                            </span>
                            <span>•</span>
                            <span className="text-zinc-500">
                              {item.source === 'indexeddb' ? 'Local IndexedDB' : 'Cloud / Web'}
                            </span>
                          </div>
                        </div>

                        {/* Actions: Set Cover, Reorder Up/Down, Remove */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleCoverMedia(item.id)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              item.isCover
                                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-zinc-700'
                            }`}
                            title={item.isCover ? 'Cover media' : 'Set as project cover'}
                          >
                            <Star className={`w-3.5 h-3.5 ${item.isCover ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveMediaItem(idx, 'up')}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={idx === gallery.length - 1}
                            onClick={() => moveMediaItem(idx, 'down')}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeMediaItem(idx)}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-900/50 cursor-pointer"
                            title="Remove media"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-center text-xs text-zinc-400">
                  No images or videos added yet. Upload files above or add an external video link.
                </div>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <Save className="w-4 h-4" />
              <span>Save Project</span>
            </button>
          </div>
        </form>

        {/* ═══════════════════════════════════════════════════
            PREVIEW MODAL (Image or Video)
            ═══════════════════════════════════════════════════ */}
        {previewMediaItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <span className="text-sm font-semibold text-white font-mono truncate">
                  {previewMediaItem.name}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewMediaItem(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 flex items-center justify-center max-h-[70vh] overflow-hidden bg-black">
                {previewMediaItem.type === 'video' ? (
                  previewMediaItem.embedUrl ? (
                    <iframe
                      src={previewMediaItem.embedUrl}
                      title={previewMediaItem.name}
                      className="w-full aspect-video rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={previewMediaItem.url}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[60vh] max-w-full rounded-lg"
                    />
                  )
                ) : (
                  <img
                    src={previewMediaItem.url}
                    alt={previewMediaItem.name}
                    className="max-h-[60vh] max-w-full object-contain rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            STORAGE ARCHITECTURE & CLOUD SETUP GUIDE MODAL
            ═══════════════════════════════════════════════════ */}
        {showStorageGuide && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-xl bg-[#111218] border border-zinc-700 rounded-2xl p-6 text-zinc-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>Media Storage & Persistence Guide</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowStorageGuide(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <span className="font-semibold text-amber-400 uppercase font-mono block">
                    1. Local Uploads (IndexedDB)
                  </span>
                  <p>
                    Files uploaded from your computer are saved into your browser&apos;s <strong>IndexedDB</strong>.
                    Unlike <code>localStorage</code> (which fails after ~5MB), IndexedDB safely accommodates large videos and high-res images on your machine across browser refreshes and restarts.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <span className="font-semibold text-amber-400 uppercase font-mono block">
                    2. Cross-Device Persistence (Recommended for Live Portfolios)
                  </span>
                  <p>
                    Because this portfolio is a client-side web application without a paid database server, local files remain on the machine where they were uploaded.
                    To display videos and images to external visitors worldwide, simply paste direct links:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                    <li><strong>Videos</strong>: YouTube or Vimeo URLs (automatically converted to clean embeds), or direct MP4/WebM hosting URLs.</li>
                    <li><strong>Images</strong>: Direct image URLs from Cloudinary, Imgur, AWS S3, or GitHub Releases.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                  <span className="font-semibold text-amber-400 uppercase font-mono block">
                    3. Optional Free Cloud Upload Integration
                  </span>
                  <p>
                    If you want file uploads to automatically store in the cloud for free without running a backend:
                  </p>
                  <p className="text-zinc-400">
                    Create a free account on <strong>Cloudinary</strong> or <strong>Supabase</strong>, enable an unsigned upload preset, and direct client-side uploads will instantly host worldwide with zero server cost.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowStorageGuide(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
