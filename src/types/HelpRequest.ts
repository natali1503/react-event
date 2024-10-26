export interface HelpRequest {
  id: string;
  title: string;
  organization: {
    title: string;
    isVerified: boolean
  };
  description: string;
  goalDescription: string;
  actionsSchedule: {
    stepLabel: string;
    isDone:	boolean;
  };
  endingDate: string;
  location: {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
  };
  contacts: {
    email: string;
    phone: string;
    website: string;
  };
  requesterType: string;
  helpType: string;
  helperRequirements: {
    helperType: string;
    isOnline: boolean;
    qualification: string;
  };
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
}
