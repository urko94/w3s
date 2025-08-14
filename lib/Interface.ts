export interface UserInterface {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  email_notifications: string;
  company: string;
  position: string;
  linkedin: string;
  desc: string;
  idea: string;
  terms_accepted: string;
  wallet: string;
  status: number;
}
export interface CreationRequestInterface {
  id: number;
  isActive: boolean;
  redeem_mail_sent: string;
  status: number;
  token_type_id: number;
  user_id: number;
  uuid: string;
}
export interface RedeemNftInfoResponseInterface {
  creationRequest: CreationRequestInterface;
  message: string;
  user: UserInterface;
}

export interface AuthMsgResponseInterface {
  message: string;
  timestamp: number;
}
export interface LoginResponseInterface {
  authToken: string;
  profile: UserInterface;
}

export interface SurveryInterface {
  answerList: Array<SurveryAnswerInterface>;
  dateEnd: string;
  dateStart: string;
  id: number;
  isActive: boolean;
  section: number;
  text: string;
  userAnswer: string;
}
export interface SurveryAnswerInterface {
  id: number;
  text: string;
  cnt: number;
  percent?: number;
}
export interface NftsResponseInterface {
  items: Array<NftStateInterface>;
  total: number;
}

export interface NftStateInterface {
  id: number;
  number: number;
  status: number;
  type: number;
  wallet_address: string;
}

export interface NftMetadataInterface {
  animation_url: string;
  attributes: Array<NftMetadataAttributeInterface>;
  description: string;
  external_url: string;
  image: string;
  interactive_nft: NftMetadatInteracitveNftInterface;
  name: string;
  number: number;
  planets: Array<any>;
}
export interface NftMetadataAttributeInterface {
  trait_type: string;
  value: string;
}
export interface NftMetadatInteracitveNftInterface {
  code_uri: string;
  version: string;
}
