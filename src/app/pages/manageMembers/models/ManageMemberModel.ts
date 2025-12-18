export interface ApiMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    memberSince: string;
    planName: string;
    status: string;
    assignedTo: {
      id: number;
      name: string;
      profilePicture: string;
    } | null;
  }

export interface ManageMemberModel {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiMember[];
    stats: {
      totalMembers: number;
      activeMembers: number;
      newMembers: number;
      plansBreakdown: Array<{
        profile_CurrentSubscription_Plan_Title: string | null;
        count: number;
      }>;
    };
  }