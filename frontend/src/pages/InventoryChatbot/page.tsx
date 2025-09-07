import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const inventoryData = {
  totalValue: 147230,
  stockAtRisk: 23,
  cashRecoverable: 12450,
  activeProducts: 1247,
  deadStockItems: [
    { name: "Winter Wool Jackets XL", quantity: 8, age: 52, price: 159.99 },
    { name: "Sports Shorts Navy", quantity: 3, age: 48, price: 39.99 }
  ],
  atRiskItems: [
    { name: "Summer Cotton T-Shirt Pack", quantity: 23, age: 28, price: 29.99 },
    { name: "Leather Handbags Brown", quantity: 15, age: 31, price: 199.99 }
  ],
  healthyItems: [
    { name: "Classic Denim Jeans - Blue M", quantity: 45, age: 12, price: 79.99 },
    { name: "Casual Sneakers White", quantity: 67, age: 5, price: 89.99 }
  ]
};

const quickReplies = [
  "What's my inventory worth?",
  "Show me dead stock",
  "How much cash can I recover?",
  "What items are at risk?",
  "Overall inventory health"
];

export default function InventoryChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI inventory assistant. I can help you understand your stock data, identify opportunities, and answer questions about your inventory health. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Inventory value questions
    if (message.includes('worth') || message.includes('value') || message.includes('total')) {
      return `Your total inventory is worth $${inventoryData.totalValue.toLocaleString()}. This represents a 2.4% increase from last period. Your highest-value items are the Leather Handbags at $199.99 each.`;
    }
    
    // Dead stock questions
    if (message.includes('dead') || message.includes('old') || message.includes('stale')) {
      const deadItems = inventoryData.deadStockItems;
      return `You have ${deadItems.length} dead stock items:\n\n${deadItems.map(item => 
        `• ${item.name}: ${item.quantity} units, ${item.age} days old ($${item.price} each)`
      ).join('\n')}\n\nThese items are over 45 days old and should be prioritized for clearance.`;
    }
    
    // Cash recovery questions
    if (message.includes('cash') || message.includes('recover') || message.includes('money')) {
      return `You can recover $${inventoryData.cashRecoverable.toLocaleString()} this week! This comes from liquidating slow-moving inventory. Focus on your dead stock items first - they're tying up the most capital.`;
    }
    
    // At-risk items
    if (message.includes('risk') || message.includes('warning') || message.includes('danger')) {
      const riskItems = inventoryData.atRiskItems;
      return `${inventoryData.stockAtRisk}% of your stock is at risk. Here are the key items to watch:\n\n${riskItems.map(item => 
        `• ${item.name}: ${item.quantity} units, ${item.age} days old`
      ).join('\n')}\n\nConsider promotional pricing or bundling to move these items.`;
    }
    
    // Health overview
    if (message.includes('health') || message.includes('overview') || message.includes('summary')) {
      return `**Inventory Health Summary:**\n\n Healthy: ${inventoryData.healthyItems.length} product lines\n At Risk: ${inventoryData.atRiskItems.length} product lines\n💀 Dead Stock: ${inventoryData.deadStockItems.length} product lines\n\nGood news: Your healthy items include bestsellers like Denim Jeans (45 units) and Sneakers (67 units). Focus on clearing the dead stock to free up cash flow.`;
    }
    
    // Specific item questions
    if (message.includes('jeans') || message.includes('denim')) {
      return `Your Classic Denim Jeans are performing well! You have 45 units, only 12 days old, priced at $79.99. This is one of your healthy stock items with good turnover.`;
    }
    
    if (message.includes('jacket') || message.includes('winter')) {
      return `Your Winter Wool Jackets are dead stock - 8 units at 52 days old, $159.99 each. Consider a clearance sale or seasonal bundle to move these before they tie up more capital.`;
    }
    
    // Recommendations
    if (message.includes('recommend') || message.includes('suggest') || message.includes('advice')) {
      return `**My Recommendations:**\n\n1. Immediate: Clear Winter Jackets & Sports Shorts (dead stock)\n2. This week: Promote T-Shirt Packs & Handbags (at-risk)\n3. Continue: Stock up on Jeans & Sneakers (high performers)\n\nThis strategy could recover $12,450 and improve your cash flow significantly.`;
    }
    
    // Help/features
    if (message.includes('help') || message.includes('what') || message.includes('can you')) {
      return `I can help you with:\n\n• Inventory value and metrics\n• Dead stock identification\n• At-risk items analysis\n• Cash recovery opportunities\n• Performance insights\n• Strategic recommendations\n\nTry asking: "What's my inventory worth?" or "Show me dead stock"`;
    }
    
    // Greeting responses
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return `Hello! Ready to optimize your inventory? I can see you have $${inventoryData.totalValue.toLocaleString()} in total stock with some great opportunities to improve cash flow. What would you like to explore first?`;
    }
    
    // Default response with suggestions
    return `I'm not sure about that specific question, but I can help you with your inventory data! Try asking about:\n\n• Your inventory value\n• Dead stock items\n• Cash recovery opportunities\n• Items at risk\n• Overall inventory health\n\nWhat interests you most?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className={index > 0 ? 'mt-1' : ''}>
        {line}
      </div>
    ));
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:shadow-primary shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`glass-card w-96 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      } flex flex-col overflow-hidden shadow-2xl`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-primary">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-white" />
            <h3 className="font-semibold text-white">Inventory Assistant</h3>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="h-4 w-4" /> : 
                        <Bot className="h-4 w-4" />
                      }
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-2'
                        : 'bg-muted text-foreground mr-2'
                    }`}>
                      <div className="text-sm whitespace-pre-line">
                        {formatMessage(message.text)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-4 border-t border-border/50">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickReplies.map((reply, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your inventory..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}