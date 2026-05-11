import {
  AlertCircle,
  ChevronRight,
  Download,
  Filter,
  History,
  Layers,
  Menu as MenuIcon,
  MoreVertical,
  Package,
  Plus,
  PlusCircle,
  Settings2,
  Tag,
  Trash2,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  menuApi,
  type CategoryDto,
  type ComboDto,
  type CreateOptionChoiceRequest,
  type CreateOptionGroupRequest,
  type DishDto,
  type DishQuantityRequest,
  type MenuItemStatus,
  type OptionGroupDto,
  type UpsertCategoryRequest,
  type UpsertComboRequest,
  type UpsertDishRequest,
  type UpdateOptionGroupRequest,
} from "../services/menuApi";
import { connectWebSocket, disconnectWebSocket } from "../services/websocket";

type TabType = "dishes" | "combos" | "categories" | "options";

type ChoiceDraft = {
  id?: number; // existing choice id when editing
  name: string;
  surcharge: string;
};

type ComboDishDraft = {
  dishId: number;
  quantity: number;
};

type ModalState =
  | { tab: TabType; mode: "create"; id?: undefined }
  | { tab: TabType; mode: "edit"; id: number };

const tabs: { id: TabType; label: string; icon: typeof MenuIcon }[] = [
  { id: "dishes", label: "Món Ăn", icon: MenuIcon },
  { id: "combos", label: "Combo", icon: Package },
  { id: "categories", label: "Danh Mục", icon: Layers },
  { id: "options", label: "Tùy Chọn", icon: Settings2 },
];

const statusLabels: Record<MenuItemStatus, string> = {
  AVAILABLE: "Còn",
  OUT_OF_STOCK: "Hết",
};

const statusColors: Record<MenuItemStatus, string> = {
  AVAILABLE: "text-green-600 bg-green-50 border-green-100",
  OUT_OF_STOCK: "text-red-600 bg-red-50 border-red-100",
};

function formatMoney(value: number | string) {
  const amount = Number(value ?? 0);
  return `${new Intl.NumberFormat("vi-VN").format(Number.isFinite(amount) ? amount : 0)}đ`;
}

function formatDateRange(startDate?: string | null, endDate?: string | null) {
  if (!startDate && !endDate) return "Chưa đặt thời gian";
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const start = startDate ? formatter.format(new Date(startDate)) : "...";
  const end = endDate ? formatter.format(new Date(endDate)) : "...";
  return `${start} - ${end}`;
}

function getDishImage(dish: DishDto) {
  return (
    dish.imageUrl ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  );
}

function parsePrice(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").replace(/[^\d]/g, "");
  return Number(normalized || 0);
}

// Format datetime-local value to ISO string for API
function toISOString(value: string): string | null {
  if (!value) return null;
  return new Date(value).toISOString();
}

// Format ISO string to datetime-local input value
function toDatetimeLocal(isoString?: string | null): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<TabType>("dishes");
  const [modal, setModal] = useState<ModalState | null>(null);

  const [dishes, setDishes] = useState<DishDto[]>([]);
  const [combos, setCombos] = useState<ComboDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroupDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  // Choice drafts for option group modal
  const [choiceDrafts, setChoiceDrafts] = useState<ChoiceDraft[]>([
    { name: "Size S", surcharge: "0" },
    { name: "Size M", surcharge: "5000" },
  ]);

  // Dish drafts for combo modal
  const [comboDishDrafts, setComboDishDrafts] = useState<ComboDishDraft[]>([
    { dishId: 0, quantity: 1 },
  ]);

  // Selected option group IDs for dish modal
  const [selectedOptionGroupIds, setSelectedOptionGroupIds] = useState<number[]>([]);

  // WebSocket setup
  const wsTokenRef = useRef<string | null>(null);

  const handleWsMessage = useCallback(
    (msg: { itemId: number; itemName: string; status: string }) => {
      const status = msg.status as MenuItemStatus;

      setDishes((prev) =>
        prev.map((d) => (d.id === msg.itemId ? { ...d, status } : d))
      );
      setCombos((prev) =>
        prev.map((c) => (c.id === msg.itemId ? { ...c, status } : c))
      );
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    wsTokenRef.current = token;

    try {
      connectWebSocket(token, (msg) => {
        setWsConnected(true);
        handleWsMessage(msg);
      });
      setWsConnected(true);
    } catch {
      setWsConnected(false);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [handleWsMessage]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dishList, comboList, categoryList, optionGroupList] =
        await Promise.all([
          menuApi.getDishes(),
          menuApi.getCombos(),
          menuApi.getCategories(),
          menuApi.getOptionGroups(),
        ]);
      setDishes(dishList);
      setCombos(comboList);
      setCategories(categoryList);
      setOptionGroups(optionGroupList);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Không tải được dữ liệu inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const categoryCountMap = useMemo(() => {
    const counts = new Map<number, number>();
    dishes.forEach((dish) => {
      if (dish.category?.id) {
        counts.set(dish.category.id, (counts.get(dish.category.id) ?? 0) + 1);
      }
    });
    return counts;
  }, [dishes]);

  const selectedDish =
    modal?.tab === "dishes" && modal.mode === "edit"
      ? (dishes.find((item) => item.id === modal.id) ?? null)
      : null;

  const selectedCombo =
    modal?.tab === "combos" && modal.mode === "edit"
      ? (combos.find((item) => item.id === modal.id) ?? null)
      : null;

  const selectedCategory =
    modal?.tab === "categories" && modal.mode === "edit"
      ? (categories.find((item) => item.id === modal.id) ?? null)
      : null;

  const selectedOptionGroup =
    modal?.tab === "options" && modal.mode === "edit"
      ? (optionGroups.find((item) => item.id === modal.id) ?? null)
      : null;

  const openCreateModal = () => {
    setChoiceDrafts([
      { name: "Size S", surcharge: "0" },
      { name: "Size M", surcharge: "5000" },
    ]);
    setComboDishDrafts([{ dishId: 0, quantity: 1 }]);
    setSelectedOptionGroupIds([]);
    setModal({ tab: activeTab, mode: "create" });
  };

  const openEditModal = (tab: TabType, id: number) => {
    setModal({ tab, mode: "edit", id });

    if (tab === "options") {
      const current = optionGroups.find((item) => item.id === id);
      setChoiceDrafts(
        current?.choices.map((c) => ({
          id: c.id,
          name: c.name,
          surcharge: String(c.surcharge),
        })) ?? []
      );
    }

    if (tab === "dishes") {
      const current = dishes.find((item) => item.id === id);
      setSelectedOptionGroupIds(
        current?.optionGroups.map((g) => g.id) ?? []
      );
    }

    if (tab === "combos") {
      const current = combos.find((item) => item.id === id);
      setComboDishDrafts(
        current?.details.map((d) => ({
          dishId: d.dish.id,
          quantity: d.quantity,
        })) ?? [{ dishId: 0, quantity: 1 }]
      );
    }
  };

  const toggleMenuItemStatus = async (itemId: number, status: MenuItemStatus) => {
    setBusyId(itemId);
    setError(null);
    try {
      const nextStatus = status === "AVAILABLE" ? "OUT_OF_STOCK" : "AVAILABLE";
      await menuApi.changeMenuItemStatus(itemId, nextStatus);
      // Optimistic update (WebSocket will also update, but this is instant)
      setDishes((prev) =>
        prev.map((d) => (d.id === itemId ? { ...d, status: nextStatus } : d))
      );
      setCombos((prev) =>
        prev.map((c) => (c.id === itemId ? { ...c, status: nextStatus } : c))
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Không cập nhật được trạng thái."
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteMenuItem = async (itemId: number) => {
    if (!window.confirm("Xác nhận xóa mục này?")) return;
    setBusyId(itemId);
    setError(null);
    try {
      await menuApi.deleteMenuItem(itemId);
      setDishes((prev) => prev.filter((d) => d.id !== itemId));
      setCombos((prev) => prev.filter((c) => c.id !== itemId));
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Không xóa được mục này."
      );
    } finally {
      setBusyId(null);
    }
  };

  const toggleChoiceStatus = async (choiceId: number, currentStatus: MenuItemStatus) => {
    setBusyId(choiceId);
    setError(null);
    try {
      const nextStatus = currentStatus === "AVAILABLE" ? "OUT_OF_STOCK" : "AVAILABLE";
      await menuApi.changeChoiceStatus(choiceId, nextStatus);
      // Optimistic update for choices
      setOptionGroups((prev) =>
        prev.map((g) => ({
          ...g,
          choices: g.choices.map((c) =>
            c.id === choiceId ? { ...c, status: nextStatus } : c
          ),
        }))
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Không đổi được trạng thái lựa chọn."
      );
    } finally {
      setBusyId(null);
    }
  };

  // ─── Form Submit Handlers ───────────────────────────────────────────────────

  const handleDishSubmit = async (formData: FormData) => {
    const payload: UpsertDishRequest = {
      name: String(formData.get("name") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      price: parsePrice(formData.get("price")),
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      recipeNotes: String(formData.get("recipeNotes") ?? "").trim() || null,
      categoryId: Number(formData.get("categoryId") ?? 0),
      optionGroupIds: selectedOptionGroupIds,
    };

    if (!payload.name) throw new Error("Tên món không được để trống.");
    if (!payload.categoryId) throw new Error("Vui lòng chọn danh mục.");

    if (modal?.mode === "edit" && modal.id) {
      await menuApi.updateDish(modal.id, payload);
    } else {
      await menuApi.createDish(payload);
    }
  };

  const handleComboSubmit = async (formData: FormData) => {
    const validDishes = comboDishDrafts.filter(
      (d) => d.dishId > 0 && d.quantity > 0
    );
    if (validDishes.length === 0) throw new Error("Combo cần có ít nhất một món.");

    const payload: UpsertComboRequest = {
      name: String(formData.get("name") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      price: parsePrice(formData.get("price")),
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      categoryId: Number(formData.get("categoryId") ?? 0),
      startDate: toISOString(String(formData.get("startDate") ?? "")),
      endDate: toISOString(String(formData.get("endDate") ?? "")),
      dishes: validDishes,
    };

    if (!payload.name) throw new Error("Tên combo không được để trống.");
    if (!payload.categoryId) throw new Error("Vui lòng chọn danh mục.");

    if (modal?.mode === "edit" && modal.id) {
      await menuApi.updateCombo(modal.id, payload);
    } else {
      await menuApi.createCombo(payload);
    }
  };

  const handleCategorySubmit = async (formData: FormData) => {
    const payload: UpsertCategoryRequest = {
      name: String(formData.get("name") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
    };

    if (!payload.name) throw new Error("Tên danh mục không được để trống.");

    if (modal?.mode === "edit" && modal.id) {
      await menuApi.updateCategory(modal.id, payload);
    } else {
      await menuApi.createCategory(payload);
    }
  };

  const handleOptionGroupSubmit = async (formData: FormData) => {
    const validChoices = choiceDrafts.filter((c) => c.name.trim());
    if (validChoices.length === 0) throw new Error("Cần ít nhất một lựa chọn.");

    const name = String(formData.get("name") ?? "").trim();
    const isRequired = formData.get("isRequired") === "on";
    const maxChoices = Number(formData.get("maxChoices") ?? 1);

    if (!name) throw new Error("Tên nhóm tùy chọn không được để trống.");

    if (modal?.mode === "edit" && modal.id) {
      // Update group config
      await menuApi.updateOptionGroup(modal.id, { name, isRequired, maxChoices });

      const currentGroup = optionGroups.find((g) => g.id === modal.id);
      const existingChoices = currentGroup?.choices ?? [];

      // Update or add each draft choice
      for (const draft of validChoices) {
        const choicePayload: CreateOptionChoiceRequest = {
          name: draft.name.trim(),
          surcharge: Number(draft.surcharge || 0),
        };

        if (draft.id) {
          // Existing choice — update it
          await menuApi.updateOptionChoice(draft.id, choicePayload);
        } else {
          // New choice — add to group
          await menuApi.addChoiceToOptionGroup(modal.id, choicePayload);
        }
      }
      // Note: deleting removed choices is not supported by current API surface.
      // Choices removed from the draft that had an id will remain on backend until API supports DELETE /option-group/choices/:id.
    } else {
      const payload: CreateOptionGroupRequest = {
        name,
        isRequired,
        maxChoices,
        choices: validChoices.map((c) => ({
          name: c.name.trim(),
          surcharge: Number(c.surcharge || 0),
        })),
      };
      await menuApi.createOptionGroup(payload);
    }
  };

  const submitModal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      if (modal?.tab === "dishes") await handleDishSubmit(formData);
      else if (modal?.tab === "combos") await handleComboSubmit(formData);
      else if (modal?.tab === "categories") await handleCategorySubmit(formData);
      else if (modal?.tab === "options") await handleOptionGroupSubmit(formData);

      setModal(null);
      await loadData();
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Không lưu được dữ liệu."
      );
    } finally {
      setSaving(false);
    }
  };

  // ─── Toggle option group selection for dish modal ────────────────────────
  const toggleOptionGroup = (id: number) => {
    setSelectedOptionGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ─── Combo dish draft helpers ─────────────────────────────────────────────
  const updateComboDish = (index: number, field: keyof ComboDishDraft, value: number) => {
    setComboDishDrafts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-black text-[#0F4C5C]">Quản Lý Thực Đơn</h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-slate-500">Cấu hình món ăn, combo và các tùy chọn đi kèm.</p>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                wsConnected
                  ? "bg-green-50 border-green-100 text-green-600"
                  : "bg-slate-50 border-slate-100 text-slate-400"
              }`}
            >
              {wsConnected ? <Wifi size={11} /> : <WifiOff size={11} />}
              {wsConnected ? "Live" : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => void loadData()}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-bold text-sm bg-white hover:bg-slate-50 transition-all active:scale-95"
          >
            <Download size={18} /> Làm mới
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F4C5C] text-white rounded-lg font-bold text-sm hover:opacity-95 shadow-lg shadow-[#0F4C5C]/20 transition-all active:scale-95"
          >
            <Plus size={18} /> Thêm {tabs.find((tab) => tab.id === activeTab)?.label}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#0F4C5C] shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <tab.icon size={18} />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Main content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {/* ── DISHES ── */}
            {activeTab === "dishes" && (
              <motion.div
                key="dishes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-32 rounded-2xl border border-slate-100 bg-slate-50 animate-pulse" />
                    ))
                  : dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 transition-all hover:border-[#0F4C5C] hover:shadow-xl hover:shadow-[#0F4C5C]/5 group relative overflow-hidden"
                      >
                        <img
                          src={getDishImage(dish)}
                          alt={dish.name}
                          className="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                          <div className="flex justify-between items-start gap-3">
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-800 truncate">{dish.name}</h4>
                              <p className="text-xs text-slate-400 truncate">
                                {dish.category?.name || "Chưa gán danh mục"}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {dish.description || dish.recipeNotes || "Chưa có mô tả."}
                          </p>
                          <div className="flex justify-between items-center mt-auto gap-2 flex-wrap">
                            <span className="font-black text-base text-[#0F4C5C]">
                              {formatMoney(dish.price)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => void openEditModal("dishes", dish.id)}
                                className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
                              >
                                Sửa
                              </button>
                              <button
                                type="button"
                                onClick={() => void toggleMenuItemStatus(dish.id, dish.status)}
                                disabled={busyId === dish.id}
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${statusColors[dish.status]}`}
                              >
                                {busyId === dish.id ? "..." : statusLabels[dish.status]}
                              </button>
                              <button
                                type="button"
                                onClick={() => void deleteMenuItem(dish.id)}
                                disabled={busyId === dish.id}
                                className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-200 hover:text-red-600"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                          {dish.optionGroups.length > 0 && (
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">
                              {dish.optionGroups.map((g) => g.name).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
              </motion.div>
            )}

            {/* ── COMBOS ── */}
            {activeTab === "combos" && (
              <motion.div
                key="combos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {loading ? (
                  <div className="h-40 rounded-2xl border border-slate-100 bg-slate-50 animate-pulse" />
                ) : (
                  combos.map((combo) => (
                    <div
                      key={combo.id}
                      className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 group hover:border-[#0F4C5C] transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-12 h-12 bg-[#0F4C5C]/5 rounded-xl flex items-center justify-center text-[#0F4C5C]">
                            <Package size={24} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-800 truncate">{combo.name}</h4>
                            <p className="text-xs text-slate-400 truncate">
                              {combo.category?.name || "Chưa gán danh mục"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        {combo.details.length > 0
                          ? combo.details.map((d) => `${d.quantity}x ${d.dish.name}`).join(", ")
                          : "Chưa có món trong combo."}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-300">Giá khuyến mãi</p>
                          <p className="font-black text-[#0F4C5C]">{formatMoney(combo.price)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-300">Thời gian</p>
                          <p className="text-xs font-bold text-slate-600">
                            {formatDateRange(combo.startDate, combo.endDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            type="button"
                            onClick={() => void openEditModal("combos", combo.id)}
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => void toggleMenuItemStatus(combo.id, combo.status)}
                            disabled={busyId === combo.id}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${statusColors[combo.status]}`}
                          >
                            {busyId === combo.id ? "..." : statusLabels[combo.status]}
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteMenuItem(combo.id)}
                            disabled={busyId === combo.id}
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-200 hover:text-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* ── CATEGORIES ── */}
            {activeTab === "categories" && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-36 rounded-2xl border border-slate-100 bg-slate-50 animate-pulse" />
                    ))
                  : categories.map((category) => (
                      <div
                        key={category.id}
                        className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#0F4C5C] transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                            <Tag size={24} />
                          </div>
                        </div>
                        <h4 className="font-black text-[#0F4C5C] text-lg">{category.name}</h4>
                        <p className="text-xs text-slate-400 mb-4">
                          {category.description || "Chưa có mô tả."}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black px-2 py-1 bg-slate-50 rounded-lg text-slate-400 uppercase tracking-widest">
                            {categoryCountMap.get(category.id) ?? 0} món
                          </span>
                          <button
                            type="button"
                            onClick={() => void openEditModal("categories", category.id)}
                            className="text-[10px] font-black text-[#0F4C5C] uppercase tracking-widest hover:underline"
                          >
                            Sửa
                          </button>
                        </div>
                      </div>
                    ))}
              </motion.div>
            )}

            {/* ── OPTIONS ── */}
            {activeTab === "options" && (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
              >
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <th className="py-5 px-8">Nhóm tùy chọn</th>
                      <th className="py-5">Cấu hình</th>
                      <th className="py-5">Lựa chọn</th>
                      <th className="py-5 text-right px-8">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <tr key={i}>
                            <td className="py-6 px-8" colSpan={4}>
                              <div className="h-6 rounded bg-slate-50 animate-pulse" />
                            </td>
                          </tr>
                        ))
                      : optionGroups.map((group) => (
                          <tr key={group.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="py-5 px-8">
                              <p className="font-bold text-slate-800">{group.name}</p>
                            </td>
                            <td>
                              <span className="text-[10px] font-black px-2 py-1 bg-[#0F4C5C]/5 text-[#0F4C5C] rounded-lg border border-[#0F4C5C]/10 uppercase">
                                {group.isRequired ? "Bắt buộc" : "Tùy chọn"} - Max: {group.maxChoices}
                              </span>
                            </td>
                            <td>
                              <p className="text-xs text-slate-400 truncate max-w-[260px]">
                                {group.choices.map((c) => c.name).join(", ")}
                              </p>
                            </td>
                            <td className="py-5 px-8 text-right">
                              <button
                                type="button"
                                onClick={() => void openEditModal("options", group.id)}
                                className="inline-flex items-center gap-1 text-xs font-black text-[#0F4C5C] hover:underline uppercase tracking-tight"
                              >
                                Chi tiết <ChevronRight size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>

                {/* {!loading && optionGroups.length > 0 && (
                  <div className="border-t border-slate-100 bg-slate-50/40 p-6 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Lựa chọn trong nhóm
                    </h4>
                    <div className="space-y-3">
                      {optionGroups.flatMap((group) =>
                        group.choices.map((choice) => (
                          <div
                            key={`${group.id}-${choice.id}`}
                            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between"
                          >
                            <div>
                              <p className="font-bold text-slate-800">{choice.name}</p>
                              <p className="text-xs text-slate-400">
                                Nhóm: {group.name} • Phụ phí: {formatMoney(choice.surcharge)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                                  choice.status === "AVAILABLE"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {statusLabels[choice.status]}
                              </span>
                              <button
                                type="button"
                                onClick={() => void toggleChoiceStatus(choice.id, choice.status)}
                                disabled={busyId === choice.id}
                                className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
                              >
                                {busyId === choice.id ? "Đang lưu" : "Đổi trạng thái"}
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )} */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F4C5C] flex items-center gap-2">
                <AlertCircle size={20} /> Cảnh báo kho
              </h3>
              <Filter size={18} className="text-slate-400 cursor-pointer hover:text-[#0F4C5C]" />
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl mb-6">
              <p className="text-xs font-bold text-orange-800 flex items-center gap-2">
                <AlertCircle size={14} /> Kiểm tra nguyên liệu đầu vào
              </p>
              <p className="text-[10px] text-orange-600 mt-1 uppercase font-black">
                Phần này vẫn là widget tĩnh, chưa nối API kho.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { name: "Thịt Bò Mỹ", val: "4.5 / 30", pct: 15, color: "bg-red-500", unit: "kg" },
                { name: "Sữa tươi", val: "12 / 50", pct: 24, color: "bg-orange-500", unit: "lít" },
                { name: "Trân châu đen", val: "85 / 100", pct: 85, color: "bg-green-500", unit: "gói" },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">{item.name}</span>
                    <span className="font-black text-slate-400">{item.val} {item.unit}</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 mt-8 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 hover:border-[#0F4C5C] hover:text-[#0F4C5C] hover:bg-slate-50 transition-all uppercase tracking-widest">
              XEM BÁO CÁO TỒN KHO
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-black text-[#0F4C5C] text-sm mb-6 flex items-center gap-2 uppercase tracking-wide">
              <History size={18} /> Nhật ký thay đổi
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
              {[
                { time: "10:45 AM", action: "Cập nhật giá", target: "Salad Gà Nướng", author: "Quản lý A", color: "bg-[#0F4C5C]" },
                { time: "08:30 AM", action: "Ẩn món ăn", target: "Burger Tôm", author: "Quản lý B", color: "bg-slate-300" },
              ].map((log) => (
                <div key={`${log.time}-${log.target}`} className="pl-6 relative">
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${log.color} border-2 border-white ring-1 ring-slate-100`} />
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{log.time}</p>
                  <p className="text-xs font-bold text-slate-700">
                    {log.action}: <span className="text-[#0F4C5C]">{log.target}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 italic">Thực hiện bởi: {log.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              {/* Modal header */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#0F4C5C] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">
                      {modal.mode === "create" ? "Thêm" : "Sửa"}{" "}
                      {tabs.find((tab) => tab.id === modal.tab)?.label}
                    </h3>
                    <p className="text-[10px] text-teal-100/60 font-black uppercase tracking-widest">
                      IRMS Inventory Management
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={(e) => void submitModal(e)}
                className="p-8 max-h-[70vh] overflow-y-auto space-y-6"
              >
                {/* ── DISH FORM ── */}
                {modal.tab === "dishes" && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Tên món ăn <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="name"
                          defaultValue={selectedDish?.name ?? ""}
                          type="text"
                          placeholder="VD: Trà Sữa Trân Châu"
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Giá bán
                        </label>
                        <input
                          name="price"
                          defaultValue={selectedDish?.price ?? ""}
                          type="text"
                          inputMode="numeric"
                          placeholder="VD: 35000"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Mô tả món ăn
                      </label>
                      <input
                        name="description"
                        defaultValue={selectedDish?.description ?? ""}
                        type="text"
                        placeholder="VD: Trà sữa truyền thống kèm trân châu đen"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Danh mục <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="categoryId"
                        defaultValue={selectedDish?.category?.id ?? ""}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold appearance-none"
                      >
                        <option value="">Chọn danh mục...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Hình ảnh
                      </label>
                      <input
                        name="imageUrl"
                        defaultValue={selectedDish?.imageUrl ?? ""}
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Ghi chú công thức
                      </label>
                      <textarea
                        name="recipeNotes"
                        defaultValue={selectedDish?.recipeNotes ?? ""}
                        placeholder="VD: Pha 70% đường, 50% đá"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5 outline-none transition-all text-sm font-bold h-24"
                      />
                    </div>

                    {/* Option Groups – multi-select checkboxes */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Nhóm tùy chọn đi kèm
                      </label>
                      {optionGroups.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">Chưa có nhóm tùy chọn nào.</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {optionGroups.map((g) => {
                            const checked = selectedOptionGroupIds.includes(g.id);
                            return (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => toggleOptionGroup(g.id)}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                                  checked
                                    ? "border-[#0F4C5C] bg-[#0F4C5C]/5 text-[#0F4C5C]"
                                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                    checked ? "bg-[#0F4C5C] border-[#0F4C5C]" : "border-slate-300"
                                  }`}
                                >
                                  {checked && (
                                    <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span className="truncate">{g.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── COMBO FORM ── */}
                {modal.tab === "combos" && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Tên Combo <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="name"
                          defaultValue={selectedCombo?.name ?? ""}
                          type="text"
                          placeholder="VD: Combo Sinh Viên"
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Giá Combo
                        </label>
                        <input
                          name="price"
                          defaultValue={selectedCombo?.price ?? ""}
                          type="text"
                          inputMode="numeric"
                          placeholder="VD: 50000"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Mô tả Combo
                      </label>
                      <input
                        name="description"
                        defaultValue={selectedCombo?.description ?? ""}
                        type="text"
                        placeholder="VD: Gấp đôi trà sữa"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Danh mục <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="categoryId"
                        defaultValue={selectedCombo?.category?.id ?? ""}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none appearance-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                      >
                        <option value="">Chọn danh mục...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Hình ảnh Combo
                      </label>
                      <input
                        name="imageUrl"
                        defaultValue={selectedCombo?.imageUrl ?? ""}
                        type="url"
                        placeholder="https://example.com/combo.jpg"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Ngày bắt đầu
                        </label>
                        <input
                          name="startDate"
                          defaultValue={toDatetimeLocal(selectedCombo?.startDate)}
                          type="datetime-local"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Ngày kết thúc
                        </label>
                        <input
                          name="endDate"
                          defaultValue={toDatetimeLocal(selectedCombo?.endDate)}
                          type="datetime-local"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                        />
                      </div>
                    </div>

                    {/* Combo dishes – dynamic UI */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Món trong Combo <span className="text-red-400">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setComboDishDrafts((p) => [...p, { dishId: 0, quantity: 1 }])}
                          className="text-[10px] font-black text-[#0F4C5C] uppercase tracking-widest flex items-center gap-1 hover:underline"
                        >
                          <PlusCircle size={14} /> Thêm món
                        </button>
                      </div>
                      <div className="space-y-2">
                        {comboDishDrafts.map((draft, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100"
                          >
                            <select
                              value={draft.dishId || ""}
                              onChange={(e) => updateComboDish(index, "dishId", Number(e.target.value))}
                              className="flex-1 bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-[#0F4C5C] appearance-none"
                            >
                              <option value="">Chọn món...</option>
                              {dishes.map((d) => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                              ))}
                            </select>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-black text-slate-400 uppercase">SL</span>
                              <input
                                type="number"
                                min={1}
                                value={draft.quantity}
                                onChange={(e) => updateComboDish(index, "quantity", Math.max(1, Number(e.target.value)))}
                                className="w-14 bg-white border border-slate-100 rounded-xl py-2 px-2 text-xs font-black text-center outline-none focus:border-[#0F4C5C]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setComboDishDrafts((p) => p.filter((_, i) => i !== index))}
                              className="p-1.5 text-slate-300 hover:text-red-400 transition-all"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ── CATEGORY FORM ── */}
                {modal.tab === "categories" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Tên danh mục <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        defaultValue={selectedCategory?.name ?? ""}
                        type="text"
                        placeholder="VD: Đồ uống nóng"
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Mô tả
                      </label>
                      <textarea
                        name="description"
                        defaultValue={selectedCategory?.description ?? ""}
                        placeholder="Giải thích về danh mục này..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none h-24 focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                      />
                    </div>
                  </>
                )}

                {/* ── OPTION GROUP FORM ── */}
                {modal.tab === "options" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Tên Nhóm tùy chọn <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="name"
                          defaultValue={selectedOptionGroup?.name ?? ""}
                          type="text"
                          placeholder="VD: Kích cỡ ly"
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/5"
                        />
                      </div>
                      <div className="space-y-2 flex items-center pt-6 gap-6">
                        <div className="flex items-center gap-2">
                          <input
                            name="isRequired"
                            type="checkbox"
                            defaultChecked={selectedOptionGroup?.isRequired ?? false}
                            className="w-4 h-4 rounded border-slate-200"
                          />
                          <label className="text-xs font-bold text-slate-600">Bắt buộc</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Max:</span>
                          <input
                            name="maxChoices"
                            type="number"
                            min={1}
                            defaultValue={selectedOptionGroup?.maxChoices ?? 1}
                            className="w-16 py-1 px-2 border rounded bg-white text-center text-xs font-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Các lựa chọn
                        </label>
                        <button
                          type="button"
                          onClick={() => setChoiceDrafts((p) => [...p, { name: "", surcharge: "0" }])}
                          className="text-[10px] font-black text-[#0F4C5C] uppercase tracking-widest flex items-center gap-1 hover:underline"
                        >
                          <PlusCircle size={14} /> Thêm Lựa Chọn
                        </button>
                      </div>
                      <div className="space-y-2">
                        {choiceDrafts.map((choice, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                          >
                            <div className="flex-1 space-y-1">
                              <label className="text-[9px] font-black text-slate-300 uppercase">
                                Tên lựa chọn {choice.id ? <span className="text-teal-400">(đã có)</span> : ""}
                              </label>
                              <input
                                value={choice.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setChoiceDrafts((p) =>
                                    p.map((item, i) => (i === index ? { ...item, name: val } : item))
                                  );
                                }}
                                type="text"
                                className="w-full bg-white border-0 py-2 px-3 rounded-lg text-xs font-bold outline-none"
                              />
                            </div>
                            <div className="w-28 space-y-1">
                              <label className="text-[9px] font-black text-slate-300 uppercase">Phụ phí (đ)</label>
                              <input
                                value={choice.surcharge}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setChoiceDrafts((p) =>
                                    p.map((item, i) => (i === index ? { ...item, surcharge: val } : item))
                                  );
                                }}
                                type="number"
                                min={0}
                                className="w-full bg-white border-0 py-2 px-3 rounded-lg text-xs font-black text-[#0F4C5C] outline-none"
                              />
                            </div>
                            <div className="pt-4">
                              <button
                                type="button"
                                onClick={() =>
                                  setChoiceDrafts((p) => p.filter((_, i) => i !== index))
                                }
                                className="p-1.5 text-slate-300 hover:text-red-400 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-10 py-3 bg-[#0F4C5C] text-white rounded-2xl font-black shadow-lg shadow-[#0F4C5C]/20 hover:opacity-95 transition-all text-sm uppercase tracking-widest disabled:opacity-70"
                  >
                    {saving ? "Đang lưu..." : "Xác nhận lưu"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}