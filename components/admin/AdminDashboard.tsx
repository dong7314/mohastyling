"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, ImageIcon } from "lucide-react";
import { PortfolioCategory } from "@/types/portfolio";
import { PortfolioFormModal } from "@/components/admin/PortfolioFormModal";
import Image from "next/image";

const categories: { value: PortfolioCategory; label: string }[] = [
  { value: "food", label: "food" },
  { value: "product", label: "product" },
  { value: "cosmetics", label: "cosmetics" },
  { value: "lifestyle", label: "life style" },
  { value: "movie", label: "movie" },
  { value: "all-in-one", label: "all in one" },
];

interface PortfolioImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface Portfolio {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  mainImage: string;
  videoUrl: string | null;
  images: PortfolioImage[];
  createdAt: string;
  updatedAt: string;
}

function getAuthHeader(): string {
  const id = sessionStorage.getItem("adminId") || "admin";
  const pw = sessionStorage.getItem("adminPw") || "admin1234";
  return `Basic ${btoa(`${id}:${pw}`)}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Portfolio[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>("food");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!sessionStorage.getItem("adminAuth");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router, isAuthenticated]);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/portfolio")
        .then((res) => (res.ok ? res.json() : { items: [] }))
        .then((data) => {
          setItems(data.items || data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const handleCreate = async (data: {
    title: string;
    description: string;
    date: string;
    category: PortfolioCategory;
    mainImage: string;
    images: { url: string; order: number }[];
    videoUrl?: string;
  }) => {
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create");
    await fetchItems();
  };

  const handleUpdate = async (data: {
    title: string;
    description: string;
    date: string;
    category: PortfolioCategory;
    mainImage: string;
    images: { url: string; order: number }[];
    videoUrl?: string;
  }) => {
    if (!editData) return;
    const res = await fetch("/api/portfolio", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ ...data, id: editData.id }),
    });
    if (!res.ok) throw new Error("Failed to update");
    setEditData(null);
    await fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/portfolio?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: getAuthHeader() },
    });
    if (!res.ok) {
      alert("삭제에 실패했습니다.");
      return;
    }
    await fetchItems();
  };

  if (!isAuthenticated) return null;

  const filteredItems = items.filter(
    (item) =>
      item.category === selectedCategory ||
      item.category === selectedCategory.replace("-", "_"),
  );

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-sans font-semibold text-2xl text-neutral-900">
            관리자 대시보드
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? "bg-accent text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Plus size={20} />새 포트폴리오 추가
          </button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-neutral-500">등록된 포트폴리오가 없습니다.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-white rounded-lg p-4 flex gap-4 items-center"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                  {item.mainImage || item.images[0]?.imageUrl ? (
                    <Image
                      src={item.mainImage || item.images[0].imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-pretendard)] font-medium text-neutral-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {item.date} · 이미지 {item.images.length}장
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditData(item);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-neutral-600 hover:text-accent transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <PortfolioFormModal
        key={editData?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={editData ? handleUpdate : handleCreate}
        editData={
          editData
            ? {
                id: editData.id,
                title: editData.title,
                description: editData.description,
                date: editData.date,
                category: editData.category as PortfolioCategory,
                mainImage: editData.mainImage,
                images: editData.images.map((img) => ({
                  url: img.imageUrl,
                  order: img.order,
                })),
                videoUrl: editData.videoUrl || undefined,
              }
            : undefined
        }
      />
    </div>
  );
}
