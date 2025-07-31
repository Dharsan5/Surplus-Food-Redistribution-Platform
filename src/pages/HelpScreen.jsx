import { ArrowLeft, MessageCircle, Phone, Mail, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HelpScreen = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "How do I list surplus food?",
      answer: "Tap the 'List Surplus Food' button on the home screen, fill in the details, and submit."
    },
    {
      question: "How can I request food pickup?",
      answer: "Browse available food items on the home page and tap 'Request Pickup' on any item you're interested in. You can track your orders in the Orders tab."
    },
    {
      question: "What safety measures should I follow?",
      answer: "Always check food quality before donation/pickup. Meet in safe, public locations."
    },
    {
      question: "How do I cancel a request?",
      answer: "Go to 'My Requests' and tap on the request you want to cancel."
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: () => {}
    },
    {
      icon: Phone,
      title: "Call Support",
      description: "+1 (555) 123-4567",
      action: () => {}
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "support@foodshare.com",
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* FAQ Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">
            <FileText className="w-5 h-5 inline mr-2" />
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {faqItems.map((item, index) => (
              <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Contact Support</h2>
          <div className="space-y-3">
            {contactOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;

