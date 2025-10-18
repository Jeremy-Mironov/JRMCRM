// src/components/DataTable.jsx
import React, { useState } from "react";

// ✅ Цвета и стили для статуса
const getStatusClass = (status) => {
    switch (status) {
        case "Completed":
            return "text-green-700 border border-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300";
        case "Pending":
            return "text-yellow-700 border border-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
        case "Active":
            return "text-blue-700 border border-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300";
        default:
            return "";
    }
};

export default function DataTable({ columns, data }) {
    // 🟢 1. Управляем состояниями поиска, сортировки, фильтрации
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("All");

    // 🔍 2. Универсальный поиск по всем видимым колонкам
    const filteredData = data.filter((item) =>
        columns.some((col) =>
            String(item[col.key] || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    // 🔽 3. Универсальная сортировка
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortKey) return 0;
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // 🟡 4. Если в таблице есть колонка status — фильтруем по ней
    const hasStatusColumn = columns.some((col) => col.key === "status");
    const filteredByStatus = hasStatusColumn
        ? sortedData.filter(
            (item) => filterStatus === "All" || item.status === filterStatus
        )
        : sortedData;

    // ⚙️ 5. Функция для переключения сортировки
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    return (
        <div className="overflow-x-auto">

            {/* 🔎 Панель управления таблицей */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                {/* Поле поиска */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border rounded w-full sm:w-64 text-gray-800 dark:text-white dark:bg-gray-700"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />


            </div>

            {/* 🔽 Кнопки сортировки — создаются автоматически на основе колонок */}
            <div className="flex flex-wrap gap-2 mb-3">
                {columns.map((col) => (
                    <button
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className={`px-3 py-1 rounded text-sm ${sortKey === col.key
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                            }`}
                    >
                        Sort by {col.label}{" "}
                        {sortKey === col.key
                            ? sortOrder === "asc"
                                ? "⬆"
                                : "⬇"
                            : ""}
                    </button>
                ))}
            </div>

            {/* 🧾 Таблица */}
            <table className="min-w-full border-collapse text-white">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={() => handleSort(col.key)}
                            >
                                {col.label}
                                {sortKey === col.key && (
                                    <span className="ml-1 text-xs">
                                        {sortOrder === "asc" ? "▲" : "▼"}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredByStatus.map((row, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2 text-left">
                                    {col.key === "status" ? (
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                row[col.key]
                                            )}`}
                                        >
                                            {row[col.key]}
                                        </span>
                                    ) : (
                                        row[col.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
