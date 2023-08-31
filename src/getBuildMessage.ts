const COLORS = {
    success: 4979275,
    info: 5211898,
    error: 16403275
}

function getTimeElapsed(start: string | Date, end: string | Date): string {
    return `${((<any>new Date(end) - <any>new Date(start)) * .001).toFixed(2)}s`
}


export function getBuildMessage(build: GoogleCloudBuild) {
    const embeds: Embed[] = [];

    const source = build.substitutions.REPO_FULL_NAME
    const branch = build.substitutions.BRANCH_NAME
    const commitUrl = build.source.gitSource.url.includes('github.com') ? `${build.source.gitSource.url.replace('.git', '')}/commit/${build.source.gitSource.revision}` : null

    const msg = {
        tts: false,
        embeds: embeds
    }

    embeds.push({
        title: `Build for ${source} was a ${build.status}`,
        description: `
        **id:** ${build.id}
        **duration:** ${getTimeElapsed(build.startTime, build.finishTime)}
        **source:** ${source}
        **branch:** ${branch}
        ${commitUrl ? `**commit url:** ${commitUrl}` : ''}
        `,
        color: COLORS.info
    })


    if (build && build.steps) {
        build.steps.forEach(step => {
            let time = '';
            if(step.timing && step.timing.endTime){
                time = getTimeElapsed(step.timing.startTime, step.timing.endTime)
            }
            embeds.push({
                title: step.id,
                description:
                    `
                    **docker image:** ${step.name}
                    **command:** ${step.entrypoint || '{entrypoint}'} ${step.args.join(' ')}
                    **duration:** ${time}
                    **status**: ${step.status}`,
                color: step.status === 'FAILURE' ? COLORS.error : COLORS.success
            });
        });
    }

    embeds.push({
        title: 'See Logs',
        description: build.logUrl,
        color: COLORS.info,
    })

    return msg;
}

export interface Embed {
    title?: string;
    description?: string;
    color?: number;
}

interface Source {
    gitSource: {
        url: string
        revision: string
    }
}

interface Substitutions {
    BRANCH_NAME: string;
    REF_NAME: string;
    REVISION_ID: string;
    TRIGGER_NAME: string;
    COMMIT_SHA: string;
    REPO_FULL_NAME: string;
    REPO_NAME: string;
    SHORT_SHA: string;
}

export interface GoogleCloudBuild {
    id: string;
    logUrl: string;
    projectId: string;
    status: string;
    steps?: Step[];
    createTime: Date;
    startTime: Date;
    finishTime: Date;
    buildTriggerId: string;
    options: Options;
    substitutions: Substitutions
    source: Source
}

export interface Options {
    substitutionOption?: string;
    logging?: string;
}

export interface Step {
    id: string;
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