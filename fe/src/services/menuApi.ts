import { request } from "./api";

export type MenuItemStatus = "AVAILABLE" | "OUT_OF_STOCK";

export type UpsertCategoryRequest = {
  name: string;
  description?: string | null;
};

export type UpsertDishRequest = {
  name: string;
  description?: string | null;
  price: number | string;
  imageUrl?: string | null;
  recipeNotes?: string | null;
  categoryId: number;
  optionGroupIds: number[];
};

export type DishQuantityRequest = {
  dishId: number;
  quantity: number;
};

export type UpsertComboRequest = {
  name: string;
  description?: string | null;
  price: number | string;
  imageUrl?: string | null;
  categoryId: number;
  startDate?: string | null;
  endDate?: string | null;
  dishes: DishQuantityRequest[];
};

export type CreateOptionChoiceRequest = {
  name: string;
  surcharge: number | string;
};

export type CreateOptionGroupRequest = {
  name: string;
  isRequired: boolean;
  maxChoices: number;
  choices: CreateOptionChoiceRequest[];
};

export type UpdateOptionGroupRequest = {
  name: string;
  isRequired: boolean;
  maxChoices: number;
};

export type UpdateOptionChoiceRequest = {
  name: string;
  surcharge: number | string;
};

export type CategoryDto = {
  id: number;
  name: string;
  description?: string | null;
};

export type OptionChoiceDto = {
  id: number;
  name: string;
  surcharge: number;
  status: MenuItemStatus;
};

export type OptionGroupDto = {
  id: number;
  name: string;
  isRequired: boolean;
  maxChoices: number;
  choices: OptionChoiceDto[];
};

export type DishDto = {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  imageUrl?: string | null;
  category?: CategoryDto | null;
  status: MenuItemStatus;
  recipeNotes?: string | null;
  optionGroups: OptionGroupDto[];
};

export type ComboDetailDto = {
  id: number;
  dish: DishDto;
  quantity: number;
};

export type ComboDto = {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  imageUrl?: string | null;
  category?: CategoryDto | null;
  startDate?: string | null;
  endDate?: string | null;
  status: MenuItemStatus;
  details: ComboDetailDto[];
};

export const menuApi = {
  // ─── Read ────────────────────────────────────────────────────────────────
  getDishes: () =>
    request<DishDto[]>("/dish/all"),

  getCombos: () =>
    request<ComboDto[]>("/combo/all"),

  getCategories: () =>
    request<CategoryDto[]>("/category/all"),

  getOptionGroups: () =>
    request<OptionGroupDto[]>("/option-group/all"),

  // ─── Dish ────────────────────────────────────────────────────────────────
  // POST /api/dish
  createDish: (body: UpsertDishRequest) =>
    request<void>("/dish", {
      method: "POST",
      body,
    }),

  // PUT /api/dish/:id
  updateDish: (id: number, body: UpsertDishRequest) =>
    request<void>(`/dish/${id}`, {
      method: "PUT",
      body,
    }),

  // ─── Combo ───────────────────────────────────────────────────────────────
  // POST /api/combo
  createCombo: (body: UpsertComboRequest) =>
    request<void>("/combo", {
      method: "POST",
      body,
    }),

  // PUT /api/combo/:id
  updateCombo: (id: number, body: UpsertComboRequest) =>
    request<void>(`/combo/${id}`, {
      method: "PUT",
      body,
    }),

  // ─── Menu item shared ────────────────────────────────────────────────────
  // DELETE /api/menu/:itemId
  deleteMenuItem: (itemId: number) =>
    request<void>(`/menu/${itemId}`, {
      method: "DELETE",
    }),

  // PATCH /api/menu/:itemId/status?status=...
  changeMenuItemStatus: (itemId: number, status: MenuItemStatus) =>
    request<void>(`/menu/${itemId}/status?status=${status}`, {
      method: "PATCH",
    }),

  // ─── Category ────────────────────────────────────────────────────────────
  // POST /api/category
  createCategory: (body: UpsertCategoryRequest) =>
    request<void>("/category", {
      method: "POST",
      body,
    }),

  // PUT /api/category/:id
  updateCategory: (id: number, body: UpsertCategoryRequest) =>
    request<void>(`/category/${id}`, {
      method: "PUT",
      body,
    }),

  // ─── Option Group ─────────────────────────────────────────────────────────
  // POST /api/option-group
  createOptionGroup: (body: CreateOptionGroupRequest) =>
    request<void>("/option-group", {
      method: "POST",
      body,
    }),

  // PUT /api/option-group/:id
  updateOptionGroup: (id: number, body: UpdateOptionGroupRequest) =>
    request<void>(`/option-group/${id}`, {
      method: "PUT",
      body,
    }),

  // ─── Option Choice ────────────────────────────────────────────────────────
  // POST /api/option-group/:groupId/choices
  addChoiceToOptionGroup: (groupId: number, body: CreateOptionChoiceRequest) =>
    request<void>(`/option-group/${groupId}/choices`, {
      method: "POST",
      body,
    }),

  // PUT /api/option-group/choices/:choiceId
  updateOptionChoice: (choiceId: number, body: UpdateOptionChoiceRequest) =>
    request<void>(`/option-group/choices/${choiceId}`, {
      method: "PUT",
      body,
    }),

  // PATCH /api/option-group/choices/:choiceId/status?status=...
  changeChoiceStatus: (choiceId: number, status: MenuItemStatus) =>
    request<void>(`/option-group/choices/${choiceId}/status?status=${status}`, {
      method: "PATCH",
    }),
};