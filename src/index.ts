import "make-promises-safe"
import environment from "./env"

import { logger } from "./logger"

logger.debug(environment.NODE_ENV)
