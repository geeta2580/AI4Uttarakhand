import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { z } from "zod";

const jobFormSchema = insertJobSchema.extend({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function EarnSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/jobs"],
  });

  const form = useForm({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      deadline: "",
      category: "",
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: z.infer<typeof jobFormSchema>) => {
      return apiRequest("POST", "/api/jobs", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Job Posted Successfully!",
        description: "Your job has been posted and is now visible to freelancers.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof jobFormSchema>) => {
    createJobMutation.mutate(data);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      content: "border-primary",
      audio: "border-secondary",
      image: "border-accent",
      design: "border-cultural",
    };
    return colors[category] || "border-gray-300";
  };

  const tips = [
    {
      title: "Copy.ai के साथ Freelancing",
      description: "Content writing projects के लिए AI का सही उपयोग",
      color: "bg-blue-50 border-primary",
    },
    {
      title: "YouTube Shorts Creation",
      description: "AI tools से viral content बनाकर monetize करें",
      color: "bg-green-50 border-secondary",
    },
    {
      title: "AI Art for Business",
      description: "Local businesses के लिए visual content create करें",
      color: "bg-yellow-50 border-cultural",
    },
  ];

  const careerLinks = [
    { label: "Resume Builder", href: "#" },
    { label: "Upwork Guide", href: "#" },
    { label: "Freelancer.com Tips", href: "#" },
  ];

  return (
    <section id="earn" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            💼 AI से कमाई करें
          </h3>
          <p className="text-xl text-gray-600">
            घर बैठे AI skills का उपयोग करके पैसे कमाएं
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Micro Job Board */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Micro-Job Board</h4>
            <div className="space-y-4 mb-8">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl animate-pulse">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-6 bg-gray-200 rounded w-48"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))
              ) : (
                jobs?.map((job: any) => (
                  <div key={job.id} className={`bg-gray-50 p-6 rounded-xl border-l-4 ${getCategoryColor(job.category)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-semibold text-lg">{job.title}</h5>
                      <Badge className="bg-cultural text-white">{job.budget}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Deadline: {job.deadline}
                      </div>
                      <Button size="sm">Apply करें</Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Post Job Button */}
            <div className="text-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary text-white hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    नया Job Post करें
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>नया Job Post करें</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Social Media Content Creation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Job की detailed जानकारी लिखें..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget</FormLabel>
                              <FormControl>
                                <Input placeholder="₹500-1000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="deadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deadline</FormLabel>
                              <FormControl>
                                <Input placeholder="3 days" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Category चुनें" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="content">Content Creation</SelectItem>
                                <SelectItem value="audio">Audio/Voiceover</SelectItem>
                                <SelectItem value="image">Image Editing</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={createJobMutation.isPending}
                      >
                        {createJobMutation.isPending ? "Posting..." : "Job Post करें"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Earning Tips & Opportunities */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
              alt="Professional freelancing workspace setup" 
              className="w-full h-48 object-cover rounded-xl mb-6"
            />
            
            <h4 className="text-2xl font-bold mb-6">कमाई के टिप्स</h4>
            
            {/* Tips Cards */}
            <div className="space-y-4 mb-8">
              {tips.map((tip, index) => (
                <div key={index} className={`${tip.color} p-4 rounded-lg border-l-4`}>
                  <h5 className="font-semibold text-primary mb-2">{tip.title}</h5>
                  <p className="text-sm text-gray-700">{tip.description}</p>
                </div>
              ))}
            </div>

            {/* Career Help */}
            <div className="bg-gray-900 text-white p-6 rounded-xl">
              <h5 className="text-xl font-bold mb-4">Career Help</h5>
              <div className="space-y-3">
                {careerLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
