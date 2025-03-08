"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"



export function FullScreenSuccess({
  show,
  onClose,
  title = "Success!",
  message = "Your operation was completed successfully.",
  buttonText = "Continue",
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-4 flex max-w-md flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Success checkmark */}
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, duration: 0.3 }}>
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" strokeWidth={3} />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

