import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertStorySchema } from "@shared/schema";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    // Accept images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'), false);
    }
  }
});

// Extend Express Request interface to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // AI Tools
  app.get("/api/ai-tools", async (req, res) => {
    try {
      const tools = await storage.getAiTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI tools" });
    }
  });

  app.get("/api/ai-tools/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.getAiTool(id);
      if (!tool) {
        return res.status(404).json({ message: "AI tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI tool" });
    }
  });

  // Jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ message: "Invalid job data" });
    }
  });

  // Stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getApprovedStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.post("/api/stories", upload.single('image'), async (req: MulterRequest, res) => {
    try {
      const { name, city, story, profession } = req.body;
      
      const storyData = {
        name,
        city,
        story,
        profession,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      };

      const validatedData = insertStorySchema.parse(storyData);
      const newStory = await storage.createStory(validatedData);
      res.status(201).json(newStory);
    } catch (error) {
      res.status(400).json({ message: "Invalid story data" });
    }
  });

  // Resources
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post("/api/resources/:id/download", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      await storage.incrementDownloads(id);
      res.json({ message: "Download tracked", fileUrl: resource.fileUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to track download" });
    }
  });

  // WhatsApp Integration
  app.post("/api/whatsapp/send", async (req, res) => {
    try {
      const { message, phone } = req.body;
      // In a real implementation, this would integrate with WhatsApp Business API
      // For now, we'll simulate the response
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      res.json({ whatsappUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to send WhatsApp message" });
    }
  });

  // Chatbot endpoint
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      
      // Simple chatbot responses
      const responses = {
        "hello": "नमस्ते! मैं आपकी AI learning में कैसे मदद कर सकता हूं?",
        "chatgpt": "ChatGPT एक AI chatbot है जो writing, coding और problem-solving में मदद करता है। क्या आप इसका setup जानना चाहते हैं?",
        "canva": "Canva AI design tool है जो posters, logos और social media content बनाने में मदद करता है।",
        "course": "हमारे पास AI की मूल बातें, Content Creation और Business में AI के courses हैं। कौन सा देखना चाहेंगे?",
        "job": "हमारे job board पर content creation, voiceover और image editing के काम मिलते हैं।",
        "default": "मुझे समझ नहीं आया। क्या आप ChatGPT, Canva, courses या jobs के बारे में पूछना चाहते हैं?"
      };

      const lowerMessage = message.toLowerCase();
      let response = responses.default;

      for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Chatbot error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
