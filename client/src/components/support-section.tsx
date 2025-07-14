import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bot, MessageCircle, Send, Loader2 } from "lucide-react";

export default function SupportSection() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chatbot", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setChatHistory(prev => [...prev, 
        { type: 'user', message: chatMessage },
        { type: 'bot', message: data.response }
      ]);
      setChatMessage("");
    },
    onError: () => {
      toast({
        title: "Chatbot Error",
        description: "चैटबॉट से connection में problem है। कृपया बाद में try करें।",
        variant: "destructive",
      });
    },
  });

  const whatsappMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/whatsapp/send", { 
        message,
        phone: "+919876543210"
      });
      return response.json();
    },
    onSuccess: (data) => {
      window.open(data.whatsappUrl, '_blank');
      toast({
        title: "WhatsApp Opened",
        description: "आपको WhatsApp पर redirect कर दिया गया है।",
      });
    },
    onError: () => {
      // Fallback to direct WhatsApp link
      window.open('https://wa.me/919876543210', '_blank');
    },
  });

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      chatMutation.mutate(chatMessage);
    }
  };

  const handleWhatsAppSupport = () => {
    const defaultMessage = "नमस्ते! मुझे AI tools के बारे में जानकारी चाहिए।";
    whatsappMutation.mutate(defaultMessage);
  };

  const helpTopics = [
    "ChatGPT setup",
    "Canva AI tutorial", 
    "Freelancing tips",
    "Job applications",
    "Course certificates"
  ];

  return (
    <section className="py-16 gradient-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          💬 मदद चाहिए? हम यहाँ हैं!
        </h3>
        <p className="text-xl text-blue-100 mb-8">
          AI के बारे में कोई भी सवाल हो, तुरंत पूछें
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Chatbot Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="text-white" size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">AI Chatbot</h4>
            <p className="text-blue-100 mb-4">24/7 available, instant answers</p>
            
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat शुरू करें
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>AI Assistant</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Chat History */}
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                    {chatHistory.length === 0 ? (
                      <div className="text-center text-gray-500">
                        <Bot className="w-8 h-8 mx-auto mb-2" />
                        <p>नमस्ते! मैं आपकी AI learning में कैसे मदद कर सकता हूं?</p>
                      </div>
                    ) : (
                      chatHistory.map((chat, index) => (
                        <div 
                          key={index} 
                          className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs rounded-lg p-3 ${
                              chat.type === 'user' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {chat.message}
                          </div>
                        </div>
                      ))
                    )}
                    {chatMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 rounded-lg p-3 flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Typing...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="अपना सवाल लिखें..."
                      disabled={chatMutation.isPending}
                    />
                    <Button 
                      type="submit" 
                      disabled={chatMutation.isPending || !chatMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fab fa-whatsapp text-white text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-3">WhatsApp Support</h4>
            <p className="text-blue-100 mb-4">Personal help से कुमाऊनी में भी</p>
            <Button 
              onClick={handleWhatsAppSupport}
              className="bg-green-500 text-white hover:bg-green-600"
              disabled={whatsappMutation.isPending}
            >
              <i className="fab fa-whatsapp mr-2"></i>
              {whatsappMutation.isPending ? "Opening..." : "WhatsApp करें"}
            </Button>
          </div>
        </div>

        {/* Quick Help Topics */}
        <div className="mt-12">
          <h5 className="text-lg font-semibold mb-4">Popular Help Topics:</h5>
          <div className="flex flex-wrap justify-center gap-3">
            {helpTopics.map((topic, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                onClick={() => {
                  setChatMessage(topic);
                  setIsChatOpen(true);
                }}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
