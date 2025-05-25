
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, Trophy, Heart, MessageSquare, MapPin, Star, Plus, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HealthAmbassador {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialties: string[];
  rating: number;
  helpedPeople: number;
  isOnline: boolean;
}

interface HealthChallenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  participants: number;
  duration: string;
  reward: string;
  progress: number;
  category: 'fitness' | 'nutrition' | 'mental' | 'wellness';
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  lastActivity: string;
  isPrivate: boolean;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
}

const HealthNetwork: React.FC = () => {
  const { toast } = useToast();
  const [ambassadors, setAmbassadors] = useState<HealthAmbassador[]>([]);
  const [challenges, setChallenges] = useState<HealthChallenge[]>([]);
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Simulate health ambassadors
    setAmbassadors([
      {
        id: '1',
        name: 'Maya Gurung',
        avatar: '/placeholder.svg',
        location: 'Kathmandu Valley',
        specialties: ['First Aid', 'Mental Health', 'Nutrition'],
        rating: 4.9,
        helpedPeople: 156,
        isOnline: true
      },
      {
        id: '2',
        name: 'Rajesh Shrestha',
        avatar: '/placeholder.svg',
        location: 'Pokhara',
        specialties: ['Fitness', 'Diabetes Care', 'Elder Care'],
        rating: 4.7,
        helpedPeople: 89,
        isOnline: false
      },
      {
        id: '3',
        name: 'Sita Thapa',
        avatar: '/placeholder.svg',
        location: 'Chitwan',
        specialties: ['Maternal Health', 'Child Care', 'Traditional Medicine'],
        rating: 4.8,
        helpedPeople: 234,
        isOnline: true
      }
    ]);

    // Simulate health challenges
    setChallenges([
      {
        id: '1',
        title: '10,000 Steps Daily',
        description: 'Walk 10,000 steps every day for 30 days',
        goal: '10,000 steps/day',
        participants: 1247,
        duration: '30 days',
        reward: 'Health Badge + NPR 500 voucher',
        progress: 67,
        category: 'fitness'
      },
      {
        id: '2',
        title: 'Mindful Meditation',
        description: 'Practice meditation for 15 minutes daily',
        goal: '15 min/day meditation',
        participants: 834,
        duration: '21 days',
        reward: 'Wellness Kit + Certificate',
        progress: 45,
        category: 'mental'
      },
      {
        id: '3',
        title: 'Healthy Eating',
        description: 'Follow a balanced diet plan',
        goal: '5 servings fruits/vegetables daily',
        participants: 592,
        duration: '14 days',
        reward: 'Nutrition Consultation',
        progress: 78,
        category: 'nutrition'
      }
    ]);

    // Simulate support groups
    setSupportGroups([
      {
        id: '1',
        name: 'Diabetes Support Nepal',
        description: 'Support group for people living with diabetes',
        members: 1247,
        category: 'Chronic Conditions',
        lastActivity: '2 hours ago',
        isPrivate: false
      },
      {
        id: '2',
        name: 'New Mothers Circle',
        description: 'Support for new mothers and pregnancy journey',
        members: 892,
        category: 'Maternal Health',
        lastActivity: '5 minutes ago',
        isPrivate: true
      },
      {
        id: '3',
        name: 'Mental Wellness Warriors',
        description: 'Mental health support and awareness',
        members: 2156,
        category: 'Mental Health',
        lastActivity: '1 hour ago',
        isPrivate: false
      }
    ]);

    // Simulate community posts
    setCommunityPosts([
      {
        id: '1',
        author: 'Dr. Aarti Sharma',
        avatar: '/placeholder.svg',
        content: 'Great tips for staying hydrated during winter! Remember to drink warm water with lemon and honey. 💧🍯',
        timestamp: '2 hours ago',
        likes: 45,
        comments: 12,
        category: 'Wellness Tips'
      },
      {
        id: '2',
        author: 'Fitness Coach Ram',
        avatar: '/placeholder.svg',
        content: 'Just completed my morning yoga session! Starting the day with 15 minutes of stretching makes such a difference. Who else is joining the mindful movement challenge? 🧘‍♂️',
        timestamp: '4 hours ago',
        likes: 78,
        comments: 23,
        category: 'Fitness'
      }
    ]);
  }, []);

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));
    
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the health challenge. Good luck!"
    });
  };

  const joinSupportGroup = (groupId: string) => {
    setSupportGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, members: group.members + 1 }
        : group
    ));
    
    toast({
      title: "Joined Support Group",
      description: "Welcome to the community! You can now participate in discussions."
    });
  };

  const createPost = () => {
    if (!newPost.trim()) return;
    
    const post: CommunityPost = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '/placeholder.svg',
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      category: 'General'
    };
    
    setCommunityPosts(prev => [post, ...prev]);
    setNewPost('');
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!"
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fitness': return 'bg-blue-100 text-blue-800';
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'mental': return 'bg-purple-100 text-purple-800';
      case 'wellness': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Community Health Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ambassadors">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ambassadors">Ambassadors</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="ambassadors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ambassadors.map((ambassador) => (
                  <Card key={ambassador.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={ambassador.avatar} />
                            <AvatarFallback>{ambassador.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {ambassador.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{ambassador.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {ambassador.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{ambassador.rating}</span>
                          <span className="text-xs text-gray-500">• {ambassador.helpedPeople} helped</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {ambassador.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button size="sm" className="w-full mt-2">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{challenge.title}</h3>
                          <Badge className={getCategoryColor(challenge.category)}>
                            {challenge.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                        <p className="text-sm"><strong>Goal:</strong> {challenge.goal}</p>
                      </div>
                      <div className="text-right">
                        <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">{challenge.reward}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{challenge.participants} participants</span>
                        <span>{challenge.duration}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3" 
                      onClick={() => joinChallenge(challenge.id)}
                    >
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              {supportGroups.map((group) => (
                <Card key={group.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{group.name}</h3>
                          {group.isPrivate && (
                            <Badge variant="outline">Private</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{group.members} members</span>
                          <span>Last activity: {group.lastActivity}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => joinSupportGroup(group.id)}
                    >
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              {/* Create Post */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your health journey, tips, or ask questions..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <Button onClick={createPost} disabled={!newPost.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Posts */}
              {communityPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{post.author}</h4>
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-gray-500">{post.timestamp}</span>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-500">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Wellness Champion</h3>
                    <p className="text-sm text-gray-600 mb-3">Complete 5 health challenges</p>
                    <Progress value={60} className="mb-2" />
                    <p className="text-xs text-gray-500">3/5 completed</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Fitness Master</h3>
                    <p className="text-sm text-gray-600 mb-3">Achieve 30-day fitness streak</p>
                    <Progress value={80} className="mb-2" />
                    <p className="text-xs text-gray-500">24/30 days</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Community Helper</h3>
                    <p className="text-sm text-gray-600 mb-3">Help 10 community members</p>
                    <Progress value={30} className="mb-2" />
                    <p className="text-xs text-gray-500">3/10 helped</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthNetwork;
