import { useState, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type Step = "initial" | "individu" | "perusahaan";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        "Halo! Saya asisten virtual ConsultaTax. Ada yang bisa saya bantu?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationStep, setConversationStep] = useState<Step>("initial");
  const cache = new Map<string, string>();
  const [isTyping, setIsTyping] = useState(false);
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  const pajakKeywords = [
    "pajak",
    "spt",
    "pph",
    "npwp",
    "penghasilan",
    "pendapatan",
    "djp",
    "lapor",
  ];

  // Auto scroll to bottom on message update
  useEffect(() => {
    const scrollArea = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const addUserMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      message: text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const sendBotMessage = (text: string) => {
    const botMessage: ChatMessage = {
      id: generateId(),
      message: text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  // const handleSendMessage = () => {
  //   if (!inputMessage.trim()) return;

  //   const text = inputMessage.trim();
  //   addUserMessage(text);
  //   setInputMessage("");

  //   setTimeout(() => {
  //     const matched = handleNLPResponse(text);

  //     if (!matched) {
  //       sendBotMessage(
  //         "Maaf, saya belum mengerti maksud Anda. Silakan pilih menu yang tersedia."
  //       );
  //     }
  //   }, 500);
  // };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    const lowerText = text.toLowerCase();

    addUserMessage(text);
    setInputMessage("");

    setTimeout(async () => {
      const matched = handleNLPResponse(text);

      if (!matched) {
        // ⛔ Topik di luar pajak
        const isTaxRelated = pajakKeywords.some((kw) => lowerText.includes(kw));
        if (!isTaxRelated) {
          sendBotMessage(
            "Maaf, saya hanya dapat membantu pertanyaan seputar perpajakan."
          );
          return;
        }

        // ✅ Cek cache dulu
        if (cache.has(lowerText)) {
          sendBotMessage(cache.get(lowerText)!);
          return;
        }

        // Tampilkan loading dan indikator mengetik
        const loadingMsg: ChatMessage = {
          id: "loading",
          message: "⏳ Sedang memproses jawaban...",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, loadingMsg]);
        setIsTyping(true);

        // 🔁 Panggil Hugging Face API
        const botReply = await callHuggingFace(text);

        // Simpan ke cache
        cache.set(lowerText, botReply);

        // Hapus loading dan tampilkan jawaban asli
        setMessages((prev) => [
          ...prev.filter((msg) => msg.id !== "loading"),
          {
            id: generateId(),
            message: botReply,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);

        setIsTyping(false);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNLPResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (
      lowerInput.includes("spt") ||
      lowerInput.includes("lapor spt") ||
      lowerInput.includes("pelaporan tahunan")
    ) {
      sendBotMessage(
        "Pelaporan SPT tahunan dapat dilakukan secara online melalui DJP Online. Kami siap membantu menyiapkan dokumen dan langkah-langkahnya."
      );
      return true;
    }

    if (
      lowerInput.includes("pph") ||
      lowerInput.includes("penghasilan") ||
      lowerInput.includes("gaji") ||
      lowerInput.includes("pendapatan")
    ) {
      sendBotMessage(
        "Kami dapat membantu Anda menghitung dan melaporkan Pajak Penghasilan (PPh) sesuai jenis pendapatan Anda, termasuk PPh 21 dan lainnya."
      );
      return true;
    }

    if (
      lowerInput.includes("npwp") ||
      lowerInput.includes("daftar npwp") ||
      lowerInput.includes("buat npwp")
    ) {
      sendBotMessage(
        "Untuk mendaftar NPWP, Anda bisa mengunjungi ereg.pajak.go.id dan menyiapkan dokumen KTP serta penghasilan tetap. Kami bisa pandu langkahnya."
      );
      return true;
    }

    // Tambahkan keyword lainnya sesuai kebutuhan
    return false;
  };

  const callHuggingFace = async (userInput: string): Promise<string> => {
    const HF_TOKEN = "import.meta.env.VITE_HF_TOKEN"; // Gunakan token kamu

    const MODEL_URL =
      "https://api-inference.huggingface.co/models/bigscience/bloomz-560m";

    const prompt = `
    Kamu adalah asisten FAQ pajak. Jawab pertanyaan user hanya jika berkaitan dengan perpajakan di Indonesia.
    Jika pertanyaan tidak berhubungan dengan pajak, jawab: "Maaf, saya hanya dapat membantu pertanyaan seputar perpajakan."
  
    Pertanyaan: ${userInput}
    Jawaban:
    `;

    try {
      const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: HF_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      const result = await response.json();

      if (result?.error) {
        console.error("Hugging Face error:", result.error);
        return "Model tidak tersedia atau sedang sibuk. Coba lagi nanti.";
      }

      if (typeof result?.[0]?.generated_text === "string") {
        return result[0].generated_text.trim();
      }

      return "Maaf, saya tidak dapat memproses saat ini.";
    } catch (error) {
      console.error("Hugging Face API error:", error);
      return "Terjadi kesalahan saat menghubungi sistem NLP.";
    }
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[90vw] max-w-sm h-[80vh] md:h-[550px] z-50 flex flex-col shadow-lg animate-slide-in">
          {/* Header */}
          <CardHeader className="bg-primary text-white rounded-t-lg p-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Chat Support
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Content */}
          <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4 pb-20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-white">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] p-2 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.message}
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gray-500 text-white">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-white">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg animate-pulse">
                        Bot sedang mengetik...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Footer Menu & Input */}
            <div className="p-3 border-t space-y-2 bg-white">
              {conversationStep === "initial" && (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addUserMessage("Saya butuh layanan untuk Individu");
                      sendBotMessage(
                        "Layanan Individu tersedia untuk:\n1. Pelaporan SPT\n2. Perhitungan & Pelaporan Pajak Penghasilan"
                      );
                      setConversationStep("individu");
                    }}
                  >
                    Layanan Individu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      addUserMessage("Saya butuh layanan untuk Perusahaan");
                      sendBotMessage(
                        "Layanan Perusahaan tersedia untuk:\n1. Pelaporan SPT\n2. Perhitungan & Pelaporan Pajak Penghasilan"
                      );
                      setConversationStep("perusahaan");
                    }}
                  >
                    Layanan Perusahaan
                  </Button>
                </div>
              )}

              {(conversationStep === "individu" ||
                conversationStep === "perusahaan") && (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      addUserMessage("Pelaporan SPT");
                      sendBotMessage(
                        "Pelaporan SPT dapat dilakukan secara online melalui DJP Online. Kami siap membantu Anda menyiapkan dokumen dan prosedurnya."
                      );
                    }}
                  >
                    Pelaporan SPT
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      addUserMessage("Perhitungan & Pelaporan PPh");
                      sendBotMessage(
                        "Kami akan membantu Anda menghitung dan melaporkan Pajak Penghasilan (PPh) sesuai dengan jenis penghasilan Anda."
                      );
                    }}
                  >
                    Perhitungan & Pelaporan PPh
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setConversationStep("initial");
                      sendBotMessage(
                        "Silakan pilih jenis layanan yang Anda butuhkan:"
                      );
                    }}
                  >
                    🔙 Kembali ke Menu Utama
                  </Button>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Tulis pertanyaan, misalnya: 'bagaimana lapor SPT?'"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg animate-pulse-glow z-40"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default FloatingChatbot;
