import { AboutData, ExperienceItem, ProjectItem, SkillCategory, ContactFormData } from '../types';
import { fallbackAboutData, fallbackExperienceData, fallbackProjectsData, fallbackSkillsData } from './data';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000';

export async function fetchAbout(): Promise<AboutData> {
  try {
    const res = await fetch(`http://localhost:5000/api/about`);
    if (!res.ok) throw new Error('Failed to fetch about data');
    return await res.json();
  } catch (error) {
    console.warn('API fetchAbout failed, using fallback data:', error);
    return fallbackAboutData;
  }
}

export async function fetchExperience(): Promise<ExperienceItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/experience`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch experience data');
    return await res.json();
  } catch (error) {
    console.warn('API fetchExperience failed, using fallback data:', error);
    return fallbackExperienceData;
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects data');
    return await res.json();
  } catch (error) {
    console.warn('API fetchProjects failed, using fallback data:', error);
    return fallbackProjectsData;
  }
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/skills`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch skills data');
    const data = await res.json();
    return data.categories || fallbackSkillsData;
  } catch (error) {
    console.warn('API fetchSkills failed, using fallback data:', error);
    return fallbackSkillsData;
  }
}

export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit contact form');
    return await res.json();
  } catch (error) {
    console.error('API submitContact failed:', error);
    // Since this is a form submission, we want to let the user know it failed
    return {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };
  }
}
