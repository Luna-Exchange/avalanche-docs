export interface IUpdateSponsorProfileBody {
  first_name: string;
  last_name: string;
  username: string;
  profile_image: string;
  location: string;
  company_name: string;
  company_user_name: string;
  website: string;
  logo: string;
  twitter_url: string;
  short_bio: string;
  industry: string;
}

export interface IUpdateTalentProfileBody {
  first_name: string;
  last_name: string;
  username: String;
  profile_image: string;
  location: string;
  skills_ids: string[];
  social_links: string[];
}

export interface ISkillsResponse {
  id: string;
  name: string;
}
