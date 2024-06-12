import { FC } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import Backdrop from "./backdrop";

import { Trash2 } from "lucide-react";

type ModalProps = {
  handleClose: () => void;
  id: string;
  firstName: string;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal: FC<ModalProps> = ({ handleClose, id, firstName }) => {
  const router = useRouter();

  const deleteArticle = async () => {
    await fetch(
      `http://ec2-54-226-156-198.compute-1.amazonaws.com/api/users/${id}`,
      {
        method: "DELETE",
      },
    )
      .then((r) => r.json())
      .then((data) => console.log(data));

    handleClose();
    router.refresh();
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal m-auto flex flex-col items-center justify-evenly rounded-xl bg-destructive/80 px-8 py-2 md:py-0"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h4 className="text-center text-lg">
          Estás seguro de borrar el usuario:{" "}
          <span className="font-bold">{firstName}</span>
        </h4>
        <button
          type="button"
          className="mx-auto block rounded-md border border-white px-4 py-1 text-lg hover:bg-destructive"
          onClick={deleteArticle}
        >
          Borrar
          <Trash2 className="ms-2 inline-block" />
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
