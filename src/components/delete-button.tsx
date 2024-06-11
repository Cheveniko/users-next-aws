"use client";
import { FC, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Trash2 } from "lucide-react";
import Modal from "@/components/ui/modal";

type DeleteButtonProps = {
  id: string;
  firstName: string;
};

const DeleteButton: FC<DeleteButtonProps> = ({ id, firstName }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <>
      <motion.button
        className="flex grow items-center justify-center gap-x-2 rounded-md bg-destructive text-sm hover:bg-destructive/80"
        onClick={() => (modalOpen ? close() : open())}
      >
        Borrar <Trash2 className="size-4" />
      </motion.button>

      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <Modal handleClose={close} id={id} firstName={firstName} />
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteButton;
