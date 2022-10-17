import { VotePackage } from './vote-package';
import { Error } from './error';
export interface VotePackageList {
    data: VotePackage[];
    error: Error;
}
