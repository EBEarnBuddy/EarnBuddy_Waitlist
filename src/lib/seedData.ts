import { FirestoreService } from './firestore';
import { Timestamp } from 'firebase/firestore';

export const seedSampleData = async () => {
  try {
    console.log('Starting to seed sample data...');

    // Sample Pods
    const pods = [
      {
        name: 'AI Builders',
        slug: 'ai-builders',
        description: 'Building the future with artificial intelligence and machine learning',
        theme: 'from-blue-500 to-purple-600',
        icon: 'Cpu',
        members: [],
        posts: [],
        events: [
          {
            title: 'AI Hackathon 2025',
            date: '2025-02-15',
            description: 'Build AI solutions for real-world problems'
          }
        ],
        pinnedResources: [
          {
            title: 'TensorFlow Documentation',
            url: 'https://tensorflow.org',
            type: 'documentation'
          },
          {
            title: 'AI Research Papers',
            url: 'https://arxiv.org',
            type: 'research'
          }
        ],
        isActive: true
      },
      {
        name: 'Web3 Pioneers',
        slug: 'web3-pioneers',
        description: 'Decentralizing the internet, one dApp at a time',
        theme: 'from-purple-500 to-pink-600',
        icon: 'Globe',
        members: [],
        posts: [],
        events: [
          {
            title: 'DeFi Demo Day',
            date: '2025-02-20',
            description: 'Showcase your DeFi projects'
          }
        ],
        pinnedResources: [
          {
            title: 'Ethereum Documentation',
            url: 'https://ethereum.org',
            type: 'documentation'
          },
          {
            title: 'Solidity by Example',
            url: 'https://solidity-by-example.org',
            type: 'tutorial'
          }
        ],
        isActive: true
      },
      {
        name: 'Climate Tech',
        slug: 'climate-tech',
        description: 'Solving climate change through innovative technology solutions',
        theme: 'from-green-500 to-emerald-600',
        icon: 'Leaf',
        members: [],
        posts: [],
        events: [
          {
            title: 'Climate Solutions Summit',
            date: '2025-03-01',
            description: 'Collaborate on climate tech innovations'
          }
        ],
        pinnedResources: [
          {
            title: 'Climate Tech Handbook',
            url: 'https://climatetech.org',
            type: 'guide'
          }
        ],
        isActive: true
      },
      {
        name: 'Design Systems',
        slug: 'design-systems',
        description: 'Creating beautiful, functional, and scalable design experiences',
        theme: 'from-pink-500 to-red-600',
        icon: 'Palette',
        members: [],
        posts: [],
        events: [],
        pinnedResources: [
          {
            title: 'Design System Checklist',
            url: 'https://designsystemchecklist.com',
            type: 'tool'
          }
        ],
        isActive: true
      },
      {
        name: 'FinTech Innovators',
        slug: 'fintech-innovators',
        description: 'Revolutionizing financial services and payment systems',
        theme: 'from-yellow-500 to-orange-600',
        icon: 'DollarSign',
        members: [],
        posts: [],
        events: [],
        pinnedResources: [],
        isActive: true
      }
    ];

    // Create pods
    const createdPods = [];
    for (const pod of pods) {
      const podId = await FirestoreService.createPod(pod);
      createdPods.push({ id: podId, ...pod });
      console.log(`Created pod: ${pod.name}`);
    }

    // Sample Freelance Gigs
    const gigs = [
      {
        title: 'Frontend Developer for E-commerce Platform',
        description: 'We\'re looking for a skilled frontend developer to help build our next-generation e-commerce platform using React and TypeScript.',
        tags: ['React', 'TypeScript', 'Tailwind CSS'],
        budget: '$2,500 - $4,000',
        duration: '2-3 weeks',
        postedBy: 'sample-user-1',
        applicants: [],
        status: 'open' as const,
        requirements: ['3+ years React experience', 'TypeScript proficiency', 'E-commerce experience preferred']
      },
      {
        title: 'UI/UX Designer for Mobile App',
        description: 'Seeking a creative UI/UX designer to design a modern mobile application for our fitness platform.',
        tags: ['Figma', 'Mobile Design', 'Prototyping'],
        budget: '$1,800 - $3,200',
        duration: '3-4 weeks',
        postedBy: 'sample-user-2',
        applicants: [],
        status: 'open' as const,
        requirements: ['Mobile design experience', 'Figma expertise', 'User research skills']
      },
      {
        title: 'Full-stack Developer for SaaS Platform',
        description: 'Build a comprehensive SaaS platform with modern technologies including React, Node.js, and PostgreSQL.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        budget: '$5,000 - $8,000',
        duration: '6-8 weeks',
        postedBy: 'sample-user-3',
        applicants: [],
        status: 'open' as const,
        requirements: ['Full-stack experience', 'Database design', 'Cloud deployment']
      }
    ];

    // Create gigs
    for (const gig of gigs) {
      await FirestoreService.createGig(gig);
      console.log(`Created gig: ${gig.title}`);
    }

    // Sample Startups
    const startups = [
      {
        name: 'HealthTech Innovations',
        description: 'AI-powered healthcare assistant that helps doctors make better diagnoses using machine learning algorithms.',
        industry: 'Healthcare',
        stage: 'Seed Stage',
        location: 'San Francisco, CA',
        createdBy: 'sample-user-1',
        applicants: [],
        status: 'active' as const,
        funding: '$500K raised',
        equity: '2-5%',
        requirements: ['React', 'Node.js', 'AI/ML', 'Healthcare Experience']
      },
      {
        name: 'EcoWear',
        description: 'Sustainable fashion marketplace connecting eco-conscious brands with consumers who care about the planet.',
        industry: 'Fashion',
        stage: 'Pre-Seed',
        location: 'New York, NY',
        createdBy: 'sample-user-2',
        applicants: [],
        status: 'active' as const,
        funding: 'Seeking $250K',
        equity: '5-10%',
        requirements: ['E-commerce', 'Sustainability', 'Marketing', 'Fashion Industry']
      },
      {
        name: 'LearnSphere',
        description: 'EdTech platform transforming online education with personalized learning experiences powered by advanced analytics.',
        industry: 'Education',
        stage: 'Series A',
        location: 'Austin, TX',
        createdBy: 'sample-user-3',
        applicants: [],
        status: 'active' as const,
        funding: '$2M raised',
        equity: '1-3%',
        requirements: ['EdTech', 'React', 'Data Analytics', 'Education']
      }
    ];

    // Create startups
    for (const startup of startups) {
      await FirestoreService.createStartup(startup);
      console.log(`Created startup: ${startup.name}`);
    }

    // Sample Posts for AI Builders pod
    if (createdPods.length > 0) {
      const aiPodId = createdPods[0].id;
      const posts = [
        {
          podId: aiPodId,
          userId: 'sample-user-1',
          content: 'Just launched our new computer vision model! Achieved 94% accuracy on the benchmark dataset. The breakthrough came from combining transformer architectures with novel attention mechanisms. Open sourcing it next week - excited to see what the community builds with it!',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
          likes: [],
          replies: [],
          bookmarks: []
        },
        {
          podId: aiPodId,
          userId: 'sample-user-2',
          content: 'Looking for collaborators on a new NLP project focused on sentiment analysis for financial markets. We\'re exploring real-time processing of news feeds and social media to predict market movements. DM me if you have experience with transformers or financial data!',
          likes: [],
          replies: [],
          bookmarks: []
        },
        {
          podId: aiPodId,
          userId: 'sample-user-3',
          content: 'Great article on transformer architectures and their applications in computer vision. The attention mechanism explanation is particularly clear and well-illustrated. Highly recommend for anyone getting started with vision transformers.',
          likes: [],
          replies: [],
          bookmarks: []
        }
      ];

      for (const post of posts) {
        await FirestoreService.createPost(post);
        console.log(`Created post in AI Builders pod`);
      }
    }

    // Sample Rooms
    const rooms = [
      {
        name: 'React Developers',
        description: 'Private room for React developers to share tips and collaborate on projects',
        members: ['sample-user-1'],
        createdBy: 'sample-user-1',
        isPrivate: true,
        messages: []
      },
      {
        name: 'Startup Founders Network',
        description: 'Exclusive room for startup founders to discuss challenges and opportunities',
        members: ['sample-user-2'],
        createdBy: 'sample-user-2',
        isPrivate: true,
        messages: []
      },
      {
        name: 'Design Feedback Circle',
        description: 'Get constructive feedback on your design work from fellow designers',
        members: ['sample-user-3'],
        createdBy: 'sample-user-3',
        isPrivate: false,
        messages: []
      }
    ];

    // Create rooms
    for (const room of rooms) {
      await FirestoreService.createRoom(room);
      console.log(`Created room: ${room.name}`);
    }

    console.log('Sample data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding sample data:', error);
    throw error;
  }
};