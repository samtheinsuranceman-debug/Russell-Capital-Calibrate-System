CREATE TABLE `advisor_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`advisorId` int NOT NULL,
	`noteType` enum('general','strategy','objection','follow_up','handoff') NOT NULL DEFAULT 'general',
	`content` text NOT NULL,
	`isPrivate` boolean NOT NULL DEFAULT false,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `advisor_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(100) NOT NULL,
	`entityId` int,
	`previousState` json,
	`newState` json,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `behavioral_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionId` int,
	`eventType` varchar(100) NOT NULL,
	`eventCategory` enum('navigation','response','hesitation','engagement','breathing','emotional_shift','conversion') NOT NULL,
	`eventData` json,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`durationMs` int,
	`pageContext` varchar(200),
	`deviceInfo` json,
	CONSTRAINT `behavioral_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calibration_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionType` enum('quick','standard','full') NOT NULL DEFAULT 'quick',
	`state` enum('initialized','breathing_calibration','values_discovery','risk_assessment','goals_timeline','decision_style','future_self_activation','genome_reveal','completed','abandoned') NOT NULL DEFAULT 'initialized',
	`currentStep` int NOT NULL DEFAULT 0,
	`totalSteps` int NOT NULL DEFAULT 10,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`durationSeconds` int,
	`breathingCalibrated` boolean NOT NULL DEFAULT false,
	`metadata` json,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calibration_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`specialty` varchar(200),
	`practiceType` varchar(100),
	`annualIncome` decimal(12,2),
	`yearsInPractice` int,
	`state` varchar(50),
	`city` varchar(100),
	`referralSource` varchar(200),
	`assignedAdvisorId` int,
	`status` enum('lead','prospect','active','inactive','churned') NOT NULL DEFAULT 'lead',
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `multi_gen_policies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`policyType` varchar(100) NOT NULL,
	`beneficiaryStructure` json,
	`generationsCovered` int,
	`annualContribution` decimal(12,2),
	`projectedValue` decimal(14,2),
	`timeHorizonYears` int,
	`notes` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `multi_gen_policies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personality_portraits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionId` int NOT NULL,
	`heroJourneyStage` varchar(100),
	`heroNarrative` text,
	`strengthsIdentified` json,
	`blindSpotsIdentified` json,
	`motivationDrivers` json,
	`communicationStyle` varchar(100),
	`decisionMakingPattern` varchar(100),
	`riskTolerance` varchar(50),
	`timeHorizonPreference` varchar(50),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `personality_portraits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`questionId` varchar(100) NOT NULL,
	`questionCategory` enum('values','risk','goals','decision_style','sensory','future_self') NOT NULL,
	`responseValue` text NOT NULL,
	`responseType` enum('scale','choice','text','slider') NOT NULL DEFAULT 'choice',
	`responseTimeMs` int,
	`confidenceScore` decimal(3,2),
	`sequenceOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `session_responses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `strategy_recommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`genomeProfileId` int NOT NULL,
	`strategyType` enum('iul','heloc_cycling','roth_ladder','captive_insurance','student_loan','infinite_banking','real_estate','stocks_bonds','crypto','solar','annuity','defined_benefit','cost_segregation','opportunity_zone','premium_financing') NOT NULL,
	`aggressivenessLevel` enum('very_low','cautious','low_moderate','moderate','mod_aggressive','aggressive','very_aggressive') NOT NULL,
	`allocationPercentage` decimal(5,2),
	`rationale` text,
	`sequenceOrder` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `strategy_recommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin','advisor') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `vision_board_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chapterId` int NOT NULL,
	`assetType` enum('image','audio','video','text') NOT NULL,
	`storageKey` varchar(500),
	`url` text,
	`mimeType` varchar(100),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vision_board_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vision_board_chapters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionId` int NOT NULL,
	`chapterNumber` int NOT NULL,
	`chapterTitle` varchar(200) NOT NULL,
	`prompt` text,
	`generatedImageUrl` text,
	`narrativeText` text,
	`triggerMoment` varchar(200),
	`emotionalTone` varchar(100),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vision_board_chapters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `voice_breathing_metadata` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionId` int NOT NULL,
	`breathingPattern` varchar(50),
	`avgInhaleMs` int,
	`avgExhaleMs` int,
	`avgHoldMs` int,
	`coherenceScore` decimal(3,2),
	`baselineHeartRate` int,
	`voiceToneProfile` json,
	`excitementBaseline` decimal(3,2),
	`confusionBaseline` decimal(3,2),
	`cameraUsed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `voice_breathing_metadata_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wealth_genome_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`sessionId` int NOT NULL,
	`versionId` int,
	`genomeType` enum('quiet_strategist','legacy_builder','freedom_architect','steady_guardian','bold_weaver','intuitive_alchemist','family_sovereign','calculated_creator','resilient_optimizer','sovereign_minimalist') NOT NULL,
	`genomeDisplayName` varchar(100) NOT NULL,
	`coreEssence` text NOT NULL,
	`strategyTilt` text NOT NULL,
	`iulAggressiveness` int NOT NULL,
	`stocksBondsAggressiveness` int NOT NULL,
	`realEstateAggressiveness` int NOT NULL,
	`cryptoAggressiveness` int NOT NULL,
	`overallProfile` varchar(50) NOT NULL,
	`valuesScore` json,
	`riskScore` json,
	`goalsScore` json,
	`decisionStyleScore` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wealth_genome_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wealth_genome_versions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`version` varchar(20) NOT NULL,
	`algorithmDescription` text,
	`scoringWeights` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wealth_genome_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `advisor_notes` ADD CONSTRAINT `advisor_notes_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `advisor_notes` ADD CONSTRAINT `advisor_notes_advisorId_users_id_fk` FOREIGN KEY (`advisorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_log` ADD CONSTRAINT `audit_log_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `behavioral_events` ADD CONSTRAINT `behavioral_events_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `behavioral_events` ADD CONSTRAINT `behavioral_events_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `calibration_sessions` ADD CONSTRAINT `calibration_sessions_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clients` ADD CONSTRAINT `clients_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clients` ADD CONSTRAINT `clients_assignedAdvisorId_users_id_fk` FOREIGN KEY (`assignedAdvisorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `multi_gen_policies` ADD CONSTRAINT `multi_gen_policies_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `personality_portraits` ADD CONSTRAINT `personality_portraits_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `personality_portraits` ADD CONSTRAINT `personality_portraits_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session_responses` ADD CONSTRAINT `session_responses_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `strategy_recommendations` ADD CONSTRAINT `strategy_recommendations_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `strategy_recommendations` ADD CONSTRAINT `strategy_recommendations_genomeProfileId_wealth_genome_profiles_id_fk` FOREIGN KEY (`genomeProfileId`) REFERENCES `wealth_genome_profiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vision_board_assets` ADD CONSTRAINT `vision_board_assets_chapterId_vision_board_chapters_id_fk` FOREIGN KEY (`chapterId`) REFERENCES `vision_board_chapters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vision_board_chapters` ADD CONSTRAINT `vision_board_chapters_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vision_board_chapters` ADD CONSTRAINT `vision_board_chapters_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `voice_breathing_metadata` ADD CONSTRAINT `voice_breathing_metadata_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `voice_breathing_metadata` ADD CONSTRAINT `voice_breathing_metadata_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wealth_genome_profiles` ADD CONSTRAINT `wealth_genome_profiles_clientId_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wealth_genome_profiles` ADD CONSTRAINT `wealth_genome_profiles_sessionId_calibration_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `calibration_sessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wealth_genome_profiles` ADD CONSTRAINT `wealth_genome_profiles_versionId_wealth_genome_versions_id_fk` FOREIGN KEY (`versionId`) REFERENCES `wealth_genome_versions`(`id`) ON DELETE no action ON UPDATE no action;