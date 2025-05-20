"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaChild, FaUser } from "react-icons/fa";

const ticketOptions = [
  { type: "Adultos", price: 20, icon: <FaUser size={36} className="text-rose-500" /> },
  { type: "Niños", price: 10, icon: <FaChild size={36} className="text-blue-500" /> },
];

export default function TicketPrice() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ticketOptions.map((ticket) => (
          <motion.div
            key={ticket.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card
              className={`p-6 rounded-2xl shadow-md cursor-pointer transition-all duration-300 bg-white border-2 ${
                selectedTicket === ticket.type
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedTicket(ticket.type)}
            >
              <CardContent className="flex flex-col items-center text-center space-y-4">
                {ticket.icon}
                <h3 className="text-xl font-semibold text-gray-800">{ticket.type}</h3>
                <p className="text-2xl font-bold text-gray-900">${ticket.price}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

