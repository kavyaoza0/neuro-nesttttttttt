// Added React import to resolve "Cannot find namespace 'React'" error when using React.ReactNode
import React from 'react';

export interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface UseCase {
  industry: string;
  benefit: string;
  image: string;
}