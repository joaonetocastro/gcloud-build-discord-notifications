export function getBuildMessage(build: GoogleCloudBuild) {
    const embeds: Embed[] = [];
    const msg = {
        content: `Build ${build.id} for project ${build.projectId} was a ${build.status}  +
            took ${(<any>new Date(build.finishTime) - <any>new Date(build.startTime)) * .001}`,
        tts: build.status === 'FAILURE' ? true : false,
        embeds: embeds
    }
    if (build && build.steps) {
        build.steps.forEach(step => {
            let time = '';
            if(step.timing && step.timing.endTime){
                time = `took ${(<any>new Date(step.timing.endTime) - <any>new Date(step.timing.startTime)) * .001}`
            }
            embeds.push({
                title: step.name,
                description:
                    `${step.entrypoint} ${step.args.join(' ')} ${time} and ${step.status}`,
                color: build.status === 'FAILURE' ? 16714507 : 6618931
            });
        });
        msg.embeds = embeds;
    }
    return msg;
}

export interface Embed {
    title?: string;
    description?: string;
    color?: number;
}

export interface GoogleCloudBuild {
    id: string;
    projectId: string;
    status: string;
    steps?: Step[];
    createTime: Date;
    startTime: Date;
    finishTime: Date;
    buildTriggerId: string;
    options: Options;
}

export interface Options {
    substitutionOption?: string;
    logging?: string;
}

export interface Step {
    name: string;
    args: string[];
    entrypoint: string;
    timing: Timing;
    pullTiming: Timing;
    status: string;
}

export interface Timing {
    startTime: Date;
    endTime: Date;
}