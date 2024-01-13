"use client";
import Link from "next/link";
import React from "react";

export default function ConfigLocalstorage() {
  return (
    <main className="min-h-screen">
      <form
        className="sm:w-[320px] w-9/12 mx-auto flex flex-col gap-8 items-start justify-center h-[80dvh] text-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const english = e.currentTarget.elements.namedItem(
            "english"
          ) as RadioNodeList;
          const other = e.currentTarget.elements.namedItem(
            "other"
          ) as RadioNodeList;
          localStorage.setItem("english", english.value);
          localStorage.setItem("kazakh", other.value);
          localStorage.setItem("ikt", other.value);
          location.href = "/";
        }}
      >
        <p className="font-black text-2xl text-center w-full">Выбор группы</p>
        <div className="flex flex-col items-start">
          <p className="font-semibold text-xl">Английский</p>
          <div>
            <div className="form-control">
              <label className="label gap-2 cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="english"
                  value={1}
                  className="radio checked:bg-red-500"
                  required
                />
                <span className="label-text">Питиримова</span>
              </label>
            </div>
            <div className="form-control gap-2 ">
              <label className="label cursor-pointer gap-2 justify-normal">
                <input
                  value={0}
                  type="radio"
                  name="english"
                  className="radio checked:bg-orange-500"
                  required
                />
                <span className="label-text ">Богданова</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold text-xl">Казахский, Физика(лаб)</p>
          <div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-normal">
                <input
                  type="radio"
                  name="other"
                  value={0}
                  className="radio checked:bg-amber-500"
                  required
                />
                <span className="label-text">Конурова, Алдаберген</span>
              </label>
            </div>
            <div className="form-control ">
              <label className="label cursor-pointer gap-2 justify-normal">
                <input
                  type="radio"
                  value={1}
                  name="other"
                  className="radio checked:bg-emerald-500"
                  required
                />
                <span className="label-text">Оспангалиева, Кузнецова</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline btn-primary text-white p-2 rounded text-base self-center"
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
