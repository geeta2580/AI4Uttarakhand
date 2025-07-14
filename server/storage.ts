import { 
  users, courses, jobs, stories, resources, aiTools,
  type User, type InsertUser, type Course, type InsertCourse,
  type Job, type InsertJob, type Story, type InsertStory,
  type Resource, type InsertResource, type AiTool, type InsertAiTool
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Jobs
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;

  // Stories
  getStories(): Promise<Story[]>;
  getApprovedStories(): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  approveStory(id: number): Promise<void>;

  // Resources
  getResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  incrementDownloads(id: number): Promise<void>;

  // AI Tools
  getAiTools(): Promise<AiTool[]>;
  getAiTool(id: number): Promise<AiTool | undefined>;
  createAiTool(tool: InsertAiTool): Promise<AiTool>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private jobs: Map<number, Job>;
  private stories: Map<number, Story>;
  private resources: Map<number, Resource>;
  private aiTools: Map<number, AiTool>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentJobId: number;
  private currentStoryId: number;
  private currentResourceId: number;
  private currentAiToolId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.jobs = new Map();
    this.stories = new Map();
    this.resources = new Map();
    this.aiTools = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentJobId = 1;
    this.currentStoryId = 1;
    this.currentResourceId = 1;
    this.currentAiToolId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize courses
    const initialCourses: Course[] = [
      {
        id: this.currentCourseId++,
        title: "AI की मूल बातें",
        description: "ChatGPT से लेकर image generation तक - सब कुछ सीखें।",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: "2 घंटे",
        price: "निःशुल्क",
        level: "शुरुआती",
        youtubeUrl: "https://youtube.com/watch?v=example1",
        isActive: true,
      },
      {
        id: this.currentCourseId++,
        title: "Content Creation",
        description: "Canva AI, DALL-E से professional content बनाना सीखें।",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: "3 घंटे",
        price: "निःशुल्क",
        level: "मध्यम",
        youtubeUrl: "https://youtube.com/watch?v=example2",
        isActive: true,
      },
      {
        id: this.currentCourseId++,
        title: "Business में AI",
        description: "अपने व्यवसाय में AI tools का सही उपयोग करें।",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: "5 घंटे",
        price: "प्रीमियम",
        level: "उन्नत",
        youtubeUrl: "https://youtube.com/watch?v=example3",
        isActive: true,
      },
    ];

    initialCourses.forEach(course => this.courses.set(course.id, course));

    // Initialize AI Tools
    const initialTools: AiTool[] = [
      {
        id: this.currentAiToolId++,
        name: "ChatGPT",
        description: "AI chatbot for writing, coding, and problem-solving",
        websiteUrl: "https://chat.openai.com",
        guideUrl: "/guide/chatgpt",
        iconColor: "green",
        iconName: "comment-dots",
        category: "text",
      },
      {
        id: this.currentAiToolId++,
        name: "Canva AI",
        description: "AI-powered design tool for creating stunning visuals",
        websiteUrl: "https://canva.com",
        guideUrl: "/guide/canva",
        iconColor: "purple",
        iconName: "magic",
        category: "design",
      },
      {
        id: this.currentAiToolId++,
        name: "DALL-E",
        description: "Generate images from text descriptions",
        websiteUrl: "https://openai.com/dall-e-2",
        guideUrl: "/guide/dalle",
        iconColor: "orange",
        iconName: "image",
        category: "image",
      },
      {
        id: this.currentAiToolId++,
        name: "Remove.bg",
        description: "Remove image backgrounds instantly with AI",
        websiteUrl: "https://remove.bg",
        guideUrl: "/guide/removebg",
        iconColor: "red",
        iconName: "cut",
        category: "image",
      },
    ];

    initialTools.forEach(tool => this.aiTools.set(tool.id, tool));

    // Initialize Jobs
    const initialJobs: Job[] = [
      {
        id: this.currentJobId++,
        title: "Social Media Content Creation",
        description: "Instagram posts और captions बनाने के लिए AI tools का उपयोग",
        budget: "₹500-1000",
        deadline: "3 days",
        category: "content",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentJobId++,
        title: "Hindi Voiceover Project",
        description: "Educational videos के लिए clear Hindi voiceover चाहिए",
        budget: "₹1500-2500",
        deadline: "1 week",
        category: "audio",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentJobId++,
        title: "Product Photography Edit",
        description: "AI tools से product images को professional बनाना",
        budget: "₹200-500",
        deadline: "2 days",
        category: "image",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    initialJobs.forEach(job => this.jobs.set(job.id, job));

    // Initialize Stories
    const initialStories: Story[] = [
      {
        id: this.currentStoryId++,
        name: "राम सिंह जी",
        city: "चमोली, उत्तराखंड",
        story: "AI weather prediction और crop monitoring से अपनी फसल में 30% वृद्धि हासिल की।",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        profession: "किसान",
        isApproved: true,
        createdAt: new Date(),
      },
      {
        id: this.currentStoryId++,
        name: "प्रिया शर्मा",
        city: "नैनीताल, उत्तराखंड",
        story: "AI tools से YouTube channel शुरू करके महीने में ₹15,000 कमा रही हैं।",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        profession: "छात्रा",
        isApproved: true,
        createdAt: new Date(),
      },
      {
        id: this.currentStoryId++,
        name: "मोहन लाल",
        city: "अल्मोड़ा, उत्तराखंड",
        story: "AI design tools से traditional handicrafts को modern look देकर online business बढ़ाया।",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        profession: "कारीगर",
        isApproved: true,
        createdAt: new Date(),
      },
    ];

    initialStories.forEach(story => this.stories.set(story.id, story));

    // Initialize Resources
    const initialResources: Resource[] = [
      {
        id: this.currentResourceId++,
        title: "AI Beginner's Guide",
        description: "Complete Hindi handbook • 25 pages",
        type: "pdf",
        fileUrl: "/resources/ai-beginners-guide.pdf",
        fileSize: "2.5 MB",
        downloads: 0,
      },
      {
        id: this.currentResourceId++,
        title: "AI Workshop Slides",
        description: "Latest presentation deck • 45 slides",
        type: "presentation",
        fileUrl: "/resources/ai-workshop-slides.pptx",
        fileSize: "15 MB",
        downloads: 0,
      },
      {
        id: this.currentResourceId++,
        title: "Tool Demo Videos",
        description: "Step-by-step tutorials • 2 hours",
        type: "video",
        fileUrl: "/resources/tool-demo-videos",
        fileSize: "500 MB",
        downloads: 0,
      },
    ];

    initialResources.forEach(resource => this.resources.set(resource.id, resource));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isActive);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      youtubeUrl: insertCourse.youtubeUrl ?? null,
      isActive: insertCourse.isActive ?? true
    };
    this.courses.set(id, course);
    return course;
  }

  // Jobs
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.isActive);
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id, 
      createdAt: new Date(),
      isActive: insertJob.isActive ?? true
    };
    this.jobs.set(id, job);
    return job;
  }

  // Stories
  async getStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  async getApprovedStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.isApproved);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const story: Story = { 
      ...insertStory, 
      id, 
      isApproved: false, 
      createdAt: new Date(),
      imageUrl: insertStory.imageUrl ?? null
    };
    this.stories.set(id, story);
    return story;
  }

  async approveStory(id: number): Promise<void> {
    const story = this.stories.get(id);
    if (story) {
      this.stories.set(id, { ...story, isApproved: true });
    }
  }

  // Resources
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { 
      ...insertResource, 
      id, 
      downloads: 0,
      fileSize: insertResource.fileSize ?? null
    };
    this.resources.set(id, resource);
    return resource;
  }

  async incrementDownloads(id: number): Promise<void> {
    const resource = this.resources.get(id);
    if (resource) {
      this.resources.set(id, { ...resource, downloads: (resource.downloads ?? 0) + 1 });
    }
  }

  // AI Tools
  async getAiTools(): Promise<AiTool[]> {
    return Array.from(this.aiTools.values());
  }

  async getAiTool(id: number): Promise<AiTool | undefined> {
    return this.aiTools.get(id);
  }

  async createAiTool(insertTool: InsertAiTool): Promise<AiTool> {
    const id = this.currentAiToolId++;
    const tool: AiTool = { 
      ...insertTool, 
      id,
      guideUrl: insertTool.guideUrl ?? null
    };
    this.aiTools.set(id, tool);
    return tool;
  }
}

export const storage = new MemStorage();
