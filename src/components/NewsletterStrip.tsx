import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface NewsletterStripProps {
  variant?: "navy" | "teal";
}

export function NewsletterStrip({ variant = "navy" }: NewsletterStripProps) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsPending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/ieeeatii@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Newsletter Subscriber`,
          email: email.trim(),
          message: "Please add this email to the newsletter subscribers list."
        })
      });

      if (response.ok) {
        toast({
          title: "Subscribed successfully!",
          description: "Thank you for joining our newsletter.",
          className: "bg-green-50 border-green-200 text-green-800",
        });
        setEmail("");
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (err: any) {
      toast({
        title: "Could not subscribe",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const bgClass = variant === "navy" ? "bg-navy" : "bg-teal";
  const btnClass = variant === "navy" ? "bg-teal hover:bg-teal/90 text-white" : "bg-navy hover:bg-navy/90 text-white";

  return (
    <section className={`${bgClass} py-16 text-white`} data-testid="newsletter-strip">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-8 h-8 opacity-80" />
              Stay Connected
            </h2>
            <p className="text-white/80 text-lg">
              Get the latest updates on our inclusive initiatives, events, and impact stories directly to your inbox.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white h-12 text-base"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" disabled={isPending} className={`h-12 px-6 font-bold tracking-wide ${btnClass}`} data-testid="btn-newsletter-submit">
                {isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-white/60 text-xs mt-3 text-center md:text-left">
              By subscribing, you agree to our Privacy Policy. We never spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
