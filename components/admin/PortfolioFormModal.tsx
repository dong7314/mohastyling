"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, Star, CalendarIcon } from "lucide-react";
import { PortfolioCategory } from "@/types/portfolio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "react-day-picker/locale/ko";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";

const categories: { value: PortfolioCategory; label: string }[] = [
  { value: "food", label: "food" },
  { value: "product", label: "product" },
  { value: "cosmetics", label: "cosmetics" },
  { value: "lifestyle", label: "life style" },
  { value: "movie", label: "movie" },
  { value: "all-in-one", label: "all in one" },
];

interface ExistingImage {
  kind: "existing";
  url: string;
  order: number;
  preview: string;
  videoUrl?: string;
}

interface NewImage {
  kind: "new";
  file: File;
  order: number;
  preview: string;
  videoUrl?: string;
}

type ImageItem = ExistingImage | NewImage;

interface PortfolioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    category: PortfolioCategory;
    mainImage: string;
    images: { url: string; order: number; videoUrl?: string }[];
  }) => Promise<void>;
  editData?: {
    id: string;
    title: string;
    description: string;
    date: string;
    category: PortfolioCategory;
    mainImage: string;
    images: { url: string; order: number; videoUrl?: string }[];
  };
}

export function PortfolioFormModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: PortfolioFormModalProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [date, setDate] = useState<Date>(
    editData?.date ? new Date(editData.date) : new Date()
  );
  const [category, setCategory] = useState<PortfolioCategory>(
    editData?.category || "food"
  );
  const [images, setImages] = useState<ImageItem[]>(
    editData?.images.map((img) => ({
      kind: "existing" as const,
      url: img.url,
      order: img.order,
      preview: img.url,
      videoUrl: img.videoUrl || "",
    })) || []
  );
  const [mainImageIndex, setMainImageIndex] = useState(
    editData?.mainImage
      ? editData.images.findIndex((img) => img.url === editData.mainImage)
      : 0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setCategory("food");
    setImages([]);
    setMainImageIndex(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addFiles = (files: FileList | File[]) => {
    const newImages: ImageItem[] = Array.from(files).map((file, i) => ({
      kind: "new" as const,
      file,
      order: images.length + i,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) addFiles(files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images.length]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) addFiles(files);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const removed = prev[index];
      if (removed.kind === "new") URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
    if (mainImageIndex === index) setMainImageIndex(0);
    else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !date || images.length === 0) {
      alert("제목, 날짜, 이미지는 필수입니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const allImageUrls: { url: string; order: number; videoUrl?: string }[] = [];

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.kind === "existing") {
          allImageUrls.push({ url: img.url, order: i, videoUrl: img.videoUrl || undefined });
        } else {
          allImageUrls.push({ url: "", order: i, videoUrl: img.videoUrl || undefined }); // placeholder
        }
      }

      const newFiles = images.filter(
        (img): img is NewImage => img.kind === "new"
      );

      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((img) => formData.append("files", img.file));

        const auth = sessionStorage.getItem("adminCredentials");

        if (!auth) {
          throw new Error("Missing admin credentials");
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Basic ${auth}` },
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        let urlIndex = 0;
        for (let i = 0; i < allImageUrls.length; i++) {
          if (allImageUrls[i].url === "") {
            allImageUrls[i] = { url: data.urls[urlIndex], order: i, videoUrl: allImageUrls[i].videoUrl };
            urlIndex++;
          }
        }
      }

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        date: format(date, "yyyy-MM-dd"),
        category,
        mainImage: allImageUrls[mainImageIndex]?.url || "",
        images: allImageUrls,
      });
      handleClose();
    } catch (err) {
      console.error("Submit error:", err);
      alert("저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200">
              <h2 className="font-[family-name:var(--font-pretendard)] text-xl font-semibold text-neutral-900">
                {editData ? "포트폴리오 수정" : "새 포트폴리오 추가"}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  제목 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="포트폴리오 제목"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>

              {/* Date & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    날짜 *
                  </label>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <button
                          className={cn(
                            "w-full flex items-center gap-2 px-4 py-3 border border-neutral-200 rounded-lg text-sm text-left transition-all hover:border-neutral-300 focus:border-accent focus:ring-2 focus:ring-accent/20",
                            !date && "text-neutral-400"
                          )}
                        >
                          <CalendarIcon size={16} className="text-neutral-400 shrink-0" />
                          {date
                            ? format(date, "yyyy년 MM월 dd일")
                            : "날짜 선택"}
                        </button>
                      }
                    />
                    <PopoverContent
                      className="w-[var(--anchor-width)] p-0 rounded-xl shadow-lg ring-1 ring-neutral-100"
                      sideOffset={8}
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        locale={ko}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    카테고리 *
                  </label>
                  <Select
                    value={category}
                    onValueChange={(val) =>
                      setCategory(val as PortfolioCategory)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={8}
                      align="start"
                      alignItemWithTrigger={false}
                    >
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  설명
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="포트폴리오 설명 (선택)"
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  이미지 * (별표가 메인 이미지)
                </label>

                {/* Drop Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    isDragOver
                      ? "border-accent bg-accent/5"
                      : "border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <Upload size={32} className="mx-auto text-neutral-400 mb-2" />
                  <p className="text-neutral-600 text-sm">
                    이미지를 드래그하거나 클릭해서 업로드
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block mt-3 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm cursor-pointer hover:bg-neutral-200 transition-colors"
                  >
                    파일 선택
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.map((img, index) => (
                      <div key={img.preview}>
                        <div
                          className={`relative aspect-square rounded-lg overflow-hidden group border-2 transition-all ${
                            mainImageIndex === index
                              ? "border-accent"
                              : "border-transparent"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.preview}
                            alt={`이미지 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => setMainImageIndex(index)}
                              className={`p-1.5 rounded-full transition-colors ${
                                mainImageIndex === index
                                  ? "bg-accent text-white"
                                  : "bg-white/90 text-neutral-700 hover:bg-accent hover:text-white"
                              }`}
                              title="메인 이미지로 설정"
                            >
                              <Star size={14} />
                            </button>
                            <button
                              onClick={() => removeImage(index)}
                              className="p-1.5 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              title="삭제"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {mainImageIndex === index && (
                            <div className="absolute top-1 left-1 bg-accent text-white px-1.5 py-0.5 rounded text-[10px]">
                              메인
                            </div>
                          )}
                        </div>
                        {category === "movie" && (
                          <input
                            type="url"
                            value={img.videoUrl || ""}
                            onChange={(e) => {
                              setImages(prev => prev.map((item, i) =>
                                i === index ? { ...item, videoUrl: e.target.value } : item
                              ));
                            }}
                            placeholder="영상 URL"
                            className="mt-1 w-full px-2 py-1 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-accent/50"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-neutral-200">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "저장 중..." : editData ? "수정" : "추가"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
