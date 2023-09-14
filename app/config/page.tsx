"use client";
import Link from "next/link";
import React from "react";

export default function ConfigLocalstorage() {
  return (
    <main className="min-h-screen">
      <form
        className="sm:w-[640px] sm:mx-auto flex flex-col gap-8 items-center justify-center h-[80dvh] text-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const english = e.currentTarget.elements.namedItem(
            "english"
          ) as RadioNodeList;
          const kazakh = e.currentTarget.elements.namedItem(
            "kazakh"
          ) as RadioNodeList;
          const ikt = e.currentTarget.elements.namedItem(
            "ikt"
          ) as RadioNodeList;
          localStorage.setItem("english", english.value);
          localStorage.setItem("kazakh", kazakh.value);
          localStorage.setItem("ikt", ikt.value);
          location.href = "/";
        }}
      >
        <p className="font-black text-2xl">Выбор группы</p>
        <div className="flex flex-col gap-2 justify-normal w-full">
          <p className="self-center font-semibold">Казахский</p>
          <div className="flex justify-evenly w-full">
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="kazakh"
                value={0}
                className="w-4 h-4 accent-red-500"
              />
              <label>Конурова</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="kazakh"
                value={1}
                className="w-4 h-4 accent-red-500"
              />
              <label>Оспангалиева</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-normal w-full">
          <p className="self-center font-semibold">Английский</p>
          <div className="flex justify-evenly w-full">
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="english"
                value={0}
                className="w-4 h-4 accent-blue-500 bg-white"
              />
              <label>Богданова</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="english"
                value={1}
                className="w-4 h-4 accent-blue-500 bg-white"
              />
              <label>Питиримова</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-normal w-full">
          <p className="self-center font-semibold">ИКТ лабораторные</p>
          <div className="flex justify-evenly w-full">
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="ikt"
                value={0}
                className="w-4 h-4 accent-red-500"
              />
              <label>Мухамедиева</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                required
                type="radio"
                name="ikt"
                value={1}
                className="w-4 h-4 accent-red-500"
              />
              <label>Дуганова</label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded text-base"
        >
          Обновить
        </button>
      </form>
      <Link className="fixed left-8 bottom-8 cursor-pointer" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    </main>
  );
}
