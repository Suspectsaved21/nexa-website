import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          type: formData.type,
        },
      ]);

      if (error) throw error;

      toast({
        title: t("contact.successTitle"),
        description: t("contact.successMessage"),
      });

      setFormData({
        name: "",
        email: "",
        message: "",
        type: "general",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        placeholder={t("contact.name")}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full"
      />
      <Input
        type="email"
        placeholder={t("contact.email")}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full"
      />
      <Select
        value={formData.type}
        onValueChange={(value) => setFormData({ ...formData, type: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("contact.messageType")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">{t("contact.general")}</SelectItem>
          <SelectItem value="support">{t("contact.technical")}</SelectItem>
          <SelectItem value="complaint">{t("contact.complaint")}</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        placeholder={t("contact.message")}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        className="w-full h-32"
      />
      <Button
        type="submit"
        className="w-full bg-nexa-600 hover:bg-nexa-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("contact.sending") : t("contact.send")}
      </Button>
    </form>
  );
};