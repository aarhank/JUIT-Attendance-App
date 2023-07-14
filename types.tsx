/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LandingPage:undefined;
  Login:undefined;
  ScanAttendance:undefined;
  Root: NavigatorScreenParams<RootDrawerParamList> | NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootDrawerParamList = {
  Dashboard:undefined;
  Attendance:undefined;
  Academics:undefined;
  Faculty:undefined;
  Grades:undefined;
};
export type RootTabParamList = {
  TabOne: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootDrawerParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootDrawerParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
