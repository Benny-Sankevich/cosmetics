import { RouteMetaInterface } from 'src/models/general-models';

export default (to:any, _from:any, next:any) => {

    const promises: Promise<any>[] = [];

    to.matched.forEach((matchedRoute:any) => {
        if (matchedRoute?.meta?.resolve) {
            promises.push((matchedRoute.meta as RouteMetaInterface).resolve());
        }
    });

    Promise.all(promises)
        .then(() => next())
        .catch(() => next(false));
}