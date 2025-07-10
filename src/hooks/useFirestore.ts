import { useState, useEffect } from 'react';
import { FirestoreService, Pod, Post, Room, Message, Startup, FreelanceGig, Notification } from '../lib/firestore';
import { useAuth } from '../contexts/AuthContext';

// Custom hooks for Firestore operations
export const usePods = () => {
  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        setLoading(true);
        const fetchedPods = await FirestoreService.getPods();
        setPods(fetchedPods);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pods');
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
  }, []);

  const joinPod = async (podId: string, userId: string) => {
    try {
      await FirestoreService.joinPod(podId, userId);
      // Refresh pods
      const updatedPods = await FirestoreService.getPods();
      setPods(updatedPods);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join pod');
    }
  };

  const leavePod = async (podId: string, userId: string) => {
    try {
      await FirestoreService.leavePod(podId, userId);
      // Refresh pods
      const updatedPods = await FirestoreService.getPods();
      setPods(updatedPods);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave pod');
    }
  };

  return { pods, loading, error, joinPod, leavePod };
};

export const usePodPosts = (podId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!podId) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await FirestoreService.getPodPosts(podId);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [podId]);

  const createPost = async (content: string, userId: string, imageUrl?: string) => {
    try {
      await FirestoreService.createPost({
        podId,
        userId,
        content,
        imageUrl,
        likes: [],
        replies: [],
        bookmarks: []
      });
      // Refresh posts
      const updatedPosts = await FirestoreService.getPodPosts(podId);
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  const likePost = async (postId: string, userId: string) => {
    try {
      await FirestoreService.likePost(postId, userId);
      // Refresh posts
      const updatedPosts = await FirestoreService.getPodPosts(podId);
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like post');
    }
  };

  const unlikePost = async (postId: string, userId: string) => {
    try {
      await FirestoreService.unlikePost(postId, userId);
      // Refresh posts
      const updatedPosts = await FirestoreService.getPodPosts(podId);
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlike post');
    }
  };

  const bookmarkPost = async (postId: string, userId: string) => {
    try {
      await FirestoreService.bookmarkPost(postId, userId);
      // Refresh posts
      const updatedPosts = await FirestoreService.getPodPosts(podId);
      setPosts(updatedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bookmark post');
    }
  };

  return { posts, loading, error, createPost, likePost, unlikePost, bookmarkPost };
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        const fetchedRooms = await FirestoreService.getRooms(currentUser.uid);
        setRooms(fetchedRooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [currentUser]);

  const createRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'lastActivity'>) => {
    try {
      await FirestoreService.createRoom(roomData);
      // Refresh rooms
      if (currentUser) {
        const updatedRooms = await FirestoreService.getRooms(currentUser.uid);
        setRooms(updatedRooms);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    }
  };

  const joinRoom = async (roomId: string) => {
    try {
      if (!currentUser) return;
      await FirestoreService.joinRoom(roomId, currentUser.uid);
      // Refresh rooms
      const updatedRooms = await FirestoreService.getRooms(currentUser.uid);
      setRooms(updatedRooms);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
    }
  };

  return { rooms, loading, error, createRoom, joinRoom };
};

export const useRoomMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);
    
    // Set up real-time listener
    const unsubscribe = FirestoreService.subscribeToRoomMessages(roomId, (newMessages) => {
      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (content: string, senderId: string, type: 'text' | 'image' | 'file' | 'video' = 'text', attachment?: any) => {
    try {
      await FirestoreService.sendMessage({
        roomId,
        senderId,
        content,
        type,
        attachment
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return { messages, loading, error, sendMessage };
};

export const useStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const fetchedStartups = await FirestoreService.getStartups();
        setStartups(fetchedStartups);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch startups');
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const createStartup = async (startupData: Omit<Startup, 'id' | 'createdAt' | 'updatedAt' | 'applicantCount'>) => {
    try {
      await FirestoreService.createStartup(startupData);
      // Refresh startups
      const updatedStartups = await FirestoreService.getStartups();
      setStartups(updatedStartups);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create startup');
    }
  };

  const applyToStartup = async (startupId: string, userId: string, applicationData?: { coverLetter?: string; portfolio?: string }) => {
    try {
      await FirestoreService.applyToStartup(startupId, userId, applicationData);
      // Refresh startups
      const updatedStartups = await FirestoreService.getStartups();
      setStartups(updatedStartups);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply to startup');
    }
  };

  const bookmarkStartup = async (startupId: string, userId: string) => {
    try {
      await FirestoreService.bookmarkStartup(startupId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bookmark startup');
    }
  };

  const unbookmarkStartup = async (startupId: string, userId: string) => {
    try {
      await FirestoreService.unbookmarkStartup(startupId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unbookmark startup');
    }
  };

  return { startups, loading, error, createStartup, applyToStartup, bookmarkStartup, unbookmarkStartup };
};

export const useGigs = () => {
  const [gigs, setGigs] = useState<FreelanceGig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const fetchedGigs = await FirestoreService.getGigs();
        setGigs(fetchedGigs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const createGig = async (gigData: Omit<FreelanceGig, 'id' | 'createdAt' | 'updatedAt' | 'applicantCount'>) => {
    try {
      await FirestoreService.createGig(gigData);
      // Refresh gigs
      const updatedGigs = await FirestoreService.getGigs();
      setGigs(updatedGigs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gig');
    }
  };

  const applyToGig = async (gigId: string, userId: string, applicationData?: { coverLetter?: string; portfolio?: string }) => {
    try {
      await FirestoreService.applyToGig(gigId, userId, applicationData);
      // Refresh gigs
      const updatedGigs = await FirestoreService.getGigs();
      setGigs(updatedGigs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply to gig');
    }
  };

  const bookmarkGig = async (gigId: string, userId: string) => {
    try {
      await FirestoreService.bookmarkGig(gigId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to bookmark gig');
    }
  };

  const unbookmarkGig = async (gigId: string, userId: string) => {
    try {
      await FirestoreService.unbookmarkGig(gigId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unbookmark gig');
    }
  };

  return { gigs, loading, error, createGig, applyToGig, bookmarkGig, unbookmarkGig };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    
    // Set up real-time listener
    const unsubscribe = FirestoreService.subscribeToUserNotifications(currentUser.uid, (newNotifications) => {
      setNotifications(newNotifications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const markAsRead = async (notificationId: string) => {
    try {
      await FirestoreService.markNotificationAsRead(notificationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
    }
  };

  const unreadCount = notifications.filter(n => !n.seen).length;

  return { notifications, loading, error, markAsRead, unreadCount };
};