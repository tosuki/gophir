import "make-promises-safe"
import environment from "./env"

import { logger } from "./logger"
import server from "./modules/http/server"

logger.debug(environment.NODE_ENV)
server.listen(3333, () => {
    logger.debug(`Listening on port 3333`)
})