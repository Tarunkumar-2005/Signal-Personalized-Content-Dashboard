"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/common/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProfileModalOpen } from "@/store/slices/uiSlice";
import { login, logout, updateProfile } from "@/store/slices/authSlice";
import { setToastMessage } from "@/store/slices/realtimeSlice";
import { TRANSLATIONS } from "@/lib/i18n";

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
];

export function ProfileModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.profileModalOpen);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const lang = useAppSelector((state) => state.preferences.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        email,
        bio,
        avatar: selectedAvatar,
      })
    );
    dispatch(setToastMessage("User profile updated!"));
    dispatch(setProfileModalOpen(false));
  };

  const handleToggleAuth = () => {
    if (isAuthenticated) {
      dispatch(logout());
      dispatch(setToastMessage("Logged out successfully"));
    } else {
      dispatch(login({ name: "Jordan Diaz", email: "jordan.diaz@example.com" }));
      dispatch(setToastMessage("Welcome back, Jordan!"));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setProfileModalOpen(false))}
      title={t.auth.profile}
      maxWidth="md"
    >
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        {/* User Card Header */}
        <div className="flex items-center gap-4 rounded-2xl bg-paper p-4 dark:bg-ink">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-signal">
            <Image src={selectedAvatar} alt="" fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-ink dark:text-paper">
              {user.name}
            </h4>
            <p className="text-xs text-ink/60 dark:text-paper/60 font-mono">
              @{user.username} • {user.readArticlesCount} stories read
            </p>
            <span className="inline-block mt-1 rounded-full bg-teal/20 px-2 py-0.5 text-[10px] font-bold text-teal">
              {isAuthenticated ? "Authenticated Member" : "Guest Mode"}
            </span>
          </div>
        </div>

        {/* Avatar Picker */}
        <div>
          <label className="text-xs font-bold text-ink dark:text-paper">
            Select Avatar
          </label>
          <div className="mt-2 flex gap-2">
            {AVATAR_OPTIONS.map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedAvatar(imgUrl)}
                className={`relative h-11 w-11 overflow-hidden rounded-full border-2 transition-transform ${
                  selectedAvatar === imgUrl
                    ? "border-signal scale-110 shadow"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={imgUrl} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="text-xs font-bold text-ink dark:text-paper">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-ink-line/20 bg-paper px-3 py-2 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/20 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="text-xs font-bold text-ink dark:text-paper">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-ink-line/20 bg-paper px-3 py-2 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/20 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Bio Input */}
        <div>
          <label className="text-xs font-bold text-ink dark:text-paper">
            Bio & Interests
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-ink-line/20 bg-paper px-3 py-2 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-signal dark:border-paper/20 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-ink-line/10 pt-4 dark:border-paper/10">
          <button
            type="button"
            onClick={handleToggleAuth}
            className="text-xs font-semibold text-live hover:underline"
          >
            {isAuthenticated ? t.auth.logout : t.auth.login}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(setProfileModalOpen(false))}
              className="rounded-xl border border-ink-line/20 px-4 py-2 text-xs font-semibold text-ink dark:border-paper/20 dark:text-paper"
            >
              {t.actions.close}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-signal px-5 py-2 text-xs font-bold text-ink hover:bg-signal-dim shadow"
            >
              {t.auth.saveChanges}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
